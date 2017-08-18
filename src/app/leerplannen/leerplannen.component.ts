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
      for(let index = 0; index < this.cursussen.length; index++) {
         this.beroepstaakService.getBeroepstakenByObject(this.cursussen[index].eindBT).subscribe(beroepstaken => {
            this.cursussen[index].beroepstaken = [];
            let btMatrix = this.generateMatrix();

            //console.log(beroepstaken);
            for(let btIndex = 0; btIndex < beroepstaken.length; btIndex++) {
              btMatrix[beroepstaken[btIndex].architectuurlaagId][beroepstaken[btIndex].activiteitId] = beroepstaken[btIndex];
              //   btMatrix[beroepstaken[btIndex].architectuurlaagId][beroepstaken[btIndex].activiteitId] = beroepstaken[btIndex];
              this.cursussen[index].beroepstaken.push(beroepstaken[btIndex]);
             }
             this.cursussen[index].btMatrix = btMatrix;
        });

        this.professionalskillService.getProfessionalskillsByObject(this.cursussen[index].eindPS).subscribe(professionalskills => {
          this.cursussen[index].professionalskills = [];
          for(let j = 0; j < professionalskills.length; j++) {
            this.cursussen[index].professionalskills.push(professionalskills[j]);
          }
        });

       }
      this.selectedCohort = coh;
      this.loading = false;
    });
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
