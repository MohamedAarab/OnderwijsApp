import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild, Directive} from '@angular/core';
import { Router } from '@angular/router';
import {LeerplannenService} from './leerplannen.service';
import {CohortenService} from '../cohorten/cohorten.service';
import {OrganisatiesService} from '../organisaties/organisaties.service';
import {OpleidingsprofielenService} from '../opleidingsprofielen/opleidingsprofielen.service';
import {CursussenService} from '../cursussen/cursussen.service';
import {BeroepstakenService} from '../beroepstaken/beroepstaken.service';
import {ProfessionalskillsService} from '../professionalskills/professionalskills.service';
import {AbstractControl, NG_VALIDATORS} from '@angular/forms';

@Component({
  templateUrl: 'leerplannen.component.html',
})
export class LeerplannenComponent implements OnInit {
    @ViewChild('LeerplanModal') LeerplanModal: any;
    @Input() courses: Array<any>; cohorten: Array<any>; opleidingen: Array<any>; cursussen: Array<any>; availableCursussen: Array<any>;
    @Output() onSelectedOpleiding = new EventEmitter<Object>(); onSelectedCohort = new EventEmitter<Object>();
    loading: boolean;
    currentState: number;
    selectedOpleiding = <any>{};
    selectedCohort = <any>{};
    cursusForm = <any>{};

  constructor(private leerplanService: LeerplannenService, private cohortService: CohortenService, private organisatieService: OrganisatiesService, private cursusService: CursussenService, private beroepstaakService: BeroepstakenService, private professionalskillService: ProfessionalskillsService, private opleidingsproefielenService: OpleidingsprofielenService) {
    this.loading = true;
  }

    ngOnInit(): void {
        this.currentState = 0;
        this.cursussen = [];
        this.cohorten = [];
        this.opleidingen = [];
        this.organisatieService.getOrganisaties().subscribe(organisaties => {
            this.opleidingsproefielenService.getOpleidingsprofielByObject(organisaties[0].opleidingsProfielen).subscribe(opleidingen => {
                this.opleidingen = opleidingen;
                this.cursusService.getCursussen().subscribe(cursussen => {
                    this.courses = cursussen;
                });
            })
            this.loading = false;
        });
    }

    addCursusToCohort(form: any) {
        this.loading = true;
        var formValues = form.value;
        this.leerplanService.addCursusToCohort(this.selectedCohort.id, formValues).subscribe(data => {
            this.LeerplanModal.hide();
            this.cursusForm = data;
            this.onSelectCohort(this.selectedCohort);
        });
        this.loading = false;
    }

    deleteCursus(cu: Object) {
        this.leerplanService.deleteCursus(this.selectedCohort.id, cu['id']).subscribe(result => {
            this.onSelectCohort(this.selectedCohort);  },
            error => { this.onSelectCohort(this.selectedCohort);  });
    }

    initializeLeerplanForm() {
        this.loading = true;
        this.availableCursussen = this.courses;
        for (let i = 0; i < this.cursussen.length; i++) {
            this.availableCursussen = this.availableCursussen.filter((x) => x.id !== this.cursussen[i].id);
        }
        var id = 0;
        if (this.availableCursussen.length > 0){
            id = this.availableCursussen[0].id;
        }
        this.cursusForm = {id: id};
        this.loading = false;
    }

    onSelectOpleiding(opl: Object) {
        this.loading = true;
        this.onSelectedOpleiding.emit(opl);
        this.selectedOpleiding = opl;
        this.cohortService.getCohortenByObject(this.selectedOpleiding['cohorten']).subscribe(cohorten => {
            this.cohorten = cohorten;
            this.currentState++;
            this.loading = false;
        });
    }


  onSelectCohort(coh: Object) {
    this.loading = true;
    this.cursusService.getCursussenByObject(coh['cursussen']).subscribe(cur => {
      this.cursussen = cur;
      for(let i = 0; i < this.cursussen.length; i++) {
        // let beroepstaken = [];
        // let professionalskills = [];
        this.beroepstaakService.getBeroepstakenByObject(this.cursussen[i].eindBT).subscribe(beroepstaken => {
            this.cursussen[i].beroepstaken = [];
            let btMatrix = this.generateMatrix();

            //console.log(beroepstaken);
            for(let j = 0; j < beroepstaken.length; j++) {
              btMatrix[beroepstaken[j].architectuurlaagId][beroepstaken[j].activiteitId] = beroepstaken[j];
              //   btMatrix[beroepstaken[j].architectuurlaagId][beroepstaken[j].activiteitId] = beroepstaken[j];
              this.cursussen[i].beroepstaken.push(beroepstaken[j]);
             }
             this.cursussen[i].btMatrix = btMatrix;
        });

        // for (let j = 0; j < this.cursussen[i].eindBT.length; j++) {
        //   this.beroepstaakService.getBeroepstaakByObject(this.cursussen[i].eindBT[j]).subscribe(beroepstaak =>{
        //     btMatrix[beroepstaak.architectuurlaagId][beroepstaak.activiteitId] = beroepstaak;
        //     beroepstaken.push(beroepstaak);
        //   });
        // }

        this.professionalskillService.getProfessionalskillsByObject(this.cursussen[i].eindPS).subscribe(professionalskills => {
          this.cursussen[i].professionalskills = [];
          for(let j = 0; j < professionalskills.length; j++) {
            this.cursussen[i].professionalskills.push(professionalskills[j]);
          }
        });

        // let professionalskills = [];
        // for (let j = 0; j < cursus.eindPS.length; j++) {
        //   this.professionalskillService.getProfessionalskillByObject(cursus.eindPS[j]).subscribe(professionalskill => {
        //     professionalskills.push(professionalskill);
        //   });
        // }


//        this.cursussen[i].professionalskills = professionalskills;
        // // cursus.eindPS = professionalskills;
        // this.cursussen.push(cursus);
      }
      this.selectedCohort = coh;
      this.loading = false;
    });


    /*if (bar.naam !== this.selectedCohort.jaar) {
      this.loading = true;
      this.onSelectedCohort.emit(coh);
      this.cohortService.getCohortenByObject(coh).subscribe(cohort => {
        this.selectedCohort = cohort;
        this.cursussen = [];
        if (this.selectedCohort.cursussen.length !== 0) {
          for (let i = 0; i < this.selectedCohort.cursussen.length; i++) {
            this.cursusService.getCursussenByObject(this.selectedCohort.cursussen[i]).subscribe(cursus => {
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
    }*/
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
        this.selectedOpleiding = {};
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
