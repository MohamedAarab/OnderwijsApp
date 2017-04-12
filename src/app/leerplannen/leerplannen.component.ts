import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { Router } from '@angular/router';
import {LeerplannenService} from './leerplannen.service';
import {CohortenService} from '../cohorten/cohorten.service';
import {OrganisatiesService} from '../organisaties/organisaties.service';
import {CursussenService} from '../cursussen/cursussen.service';
import {BeroepstakenService} from '../beroepstaken/beroepstaken.service';
import {ProfessionalskillsService} from '../professionalskills/professionalskills.service';

@Component({
  templateUrl: 'leerplannen.component.html',
})
export class LeerplannenComponent implements OnInit {

  @Input() courses: Array<any>; cohorten: Array<any>; organisaties: Array<any>; cursussen: Array<any>;
  @Output() onSelectedOrganisatie = new EventEmitter<Object>(); onSelectedCohort = new EventEmitter<Object>();
  loading: boolean;
  currentState: number;
  selectedOrganisatie = <any>{};
  selectedCohort = <any>{};

  constructor(private leerplanService: LeerplannenService, private cohortService: CohortenService, private organisatieService: OrganisatiesService, private cursusService: CursussenService, private beroepstaakService: BeroepstakenService, private professionalskillService: ProfessionalskillsService) {
    this.loading = true;
  }

  ngOnInit(): void {
    this.currentState = 0;
    this.cursussen = [];
    this.cohorten = [];
    this.organisaties = [];
    this.organisatieService.getOrganisaties().subscribe(organisaties => {
      this.organisaties = organisaties[0].opleidingsProfielen;
      this.loading = false;
    });

    // this.selectedButton = 1;
    // this.cursusService.getCursussen().subscribe(cursussen => {
    //     this.courses = cursussen;
    //     console.log(this.courses);
    //     this.currentCourse = this.courses[0];
    //     for(let j = 0; j < this.courses.length; j++) {
    //       for(let i = 0; i < this.courses[j].leerdoelen.length; i++){
    //         this.cursusService.getDataByHref(this.courses[j].leerdoelen[i].href)
    //           .subscribe(leerdoelen => {
    //
    //               this.courses[j].leerdoelen[i].data = leerdoelen;
    //               if(this.courses[j].leerdoelen[i].data.bloomniveau != null) {
    //                 this.cursusService.getDataByHref(this.courses[j].leerdoelen[i].data.bloomniveau.href)
    //                   .subscribe(bloomniveau => {
    //                     this.courses[j].leerdoelen[i].data.bloomniveau.data = bloomniveau;
    //                   });
    //               }
    //             },
    //             error => console.log('Error: ', error));
    //       }
    //
    //       for(let i = 0; i < this.courses[j].eindBT.length; i++){
    //         // console.log(i);
    //         // console.log(i);
    //         this.cursusService.getDataByHref(this.courses[j].eindBT[i].href)
    //           .subscribe(beroepstaken => {
    //               //console.log(i);
    //               this.courses[j].eindBT[i].data = beroepstaken;
    //             },
    //             error => console.log('Error: ', error));
    //       }
    //
    //       for(let i = 0; i < this.courses[j].eindPS.length; i++){
    //         this.cursusService.getDataByHref(this.courses[j].eindPS[i].href)
    //           .subscribe(professionalskills => {
    //             this.courses[j].eindPS[i].data = professionalskills;
    //           });
    //       }
    //
    //       this.cursusService.getDataByHref(this.courses[j].coordinator.href)
    //         .subscribe(coordinator => {
    //           this.courses[j].coordinator.data = coordinator;
    //         });
    //     }
    //   },
    //   error => console.log('Error: ', error),
    //   () => {
    //     this.loading = false;
    //     console.log(this.currentCourse);
    //     //console.log(this.currentCourse.eindBT[0].data);
    //   });
  }

  onSelectOrganisatie(org: Object) {
    this.loading = true;
    this.onSelectedOrganisatie.emit(org);
    console.log(this.selectedOrganisatie);
    this.organisatieService.getOrganisatieByObject(org).subscribe(organisatie => {
      this.selectedOrganisatie = organisatie;
      this.cohorten = this.selectedOrganisatie.cohorten;
      this.currentState++;
      this.loading = false;
    });
  }


  onSelectCohort(coh: Object) {
   let bar = <any>{};
   bar = coh;
    if (bar.naam !== this.selectedCohort.jaar) {
      this.loading = true;
      this.onSelectedCohort.emit(coh);
      this.cohortService.getCohortByObject(coh).subscribe(cohort => {
        this.selectedCohort = cohort;
        this.cursussen = [];
        if (this.selectedCohort.cursussen.length !== 0) {
          for (let i = 0; i < this.selectedCohort.cursussen.length; i++) {
            this.cursusService.getCursusByObject(this.selectedCohort.cursussen[i]).subscribe(cursus => {
              let btMatrix = this.generateMatrix();

              let beroepstaken = [];
              for (let j = 0; j < cursus.eindBT.length; j++) {
                this.beroepstaakService.getBeroepstaakByObject(cursus.eindBT[j]).subscribe(beroepstaak =>{
                  btMatrix[beroepstaak.architectuurlaagId][beroepstaak.activiteitId] = beroepstaak;
                  beroepstaken.push(beroepstaak);
                });
              }

              let professionalskills = [];
              for (let j = 0; j < cursus.eindPS.length; j++) {
                this.professionalskillService.getProfessionalskillByObject(cursus.eindPS[j]).subscribe(professionalskill => {
                  professionalskills.push(professionalskill);
                });
              }

              cursus.btMatrix = btMatrix;
              cursus.eindBT = beroepstaken;
              cursus.eindPS = professionalskills;
              // cursus.eindPS = professionalskills;
              this.cursussen.push(cursus);
            });
          }
          console.log(this.cursussen);
        }
        this.loading = false;
      });
    }
  }

  generateMatrix() {
    let btMatrix = Array.apply(null, Array(6));
    for(let i = 0; i < btMatrix.length; i++) {
      btMatrix[i] = Array.apply(null, Array(6));
    }

    btMatrix[0][1] = 'B';
    btMatrix[0][2] = 'A';
    btMatrix[0][3] = 'A';
    btMatrix[0][4] = 'O';
    btMatrix[0][5] = 'R';
    btMatrix[1][0] = 'G';
    btMatrix[2][0] = 'B';
    btMatrix[3][0] = 'I';
    btMatrix[4][0] = 'S';
    btMatrix[5][0] = 'H';

    return btMatrix;
  }
  isEmptyObject(obj) {
    return (Object.keys(obj).length === 0);
  }

  goBack(currentState) {
    console.log(currentState);
    switch (currentState) {
      case 1:
        this.selectedOrganisatie = {};
        this.selectedCohort = {};
        this.cursussen = [];
        this.currentState--;
        break;
      case 2:
        this.currentState--;
        break;
    }
  }

}
