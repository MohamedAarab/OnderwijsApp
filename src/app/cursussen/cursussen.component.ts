import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild, Directive} from '@angular/core';
import { Router } from '@angular/router';
import {CursussenService} from './cursussen.service';
import {BeroepstakenService} from '../beroepstaken/beroepstaken.service';
import {ProfessionalskillsService} from '../professionalskills/professionalskills.service';
import {LeerdoelenService} from '../leerdoelen/leerdoelen.service';
import {ToetsenService} from '../toetsen/toetsen.service';
import {AbstractControl, NG_VALIDATORS} from '@angular/forms';
import {ToetsmatrijzenService} from "../toetsmatrijzen/toetsmatrijzen.service";

@Component({
  templateUrl: 'cursussen.component.html',
})
export class CursussenComponent implements OnInit {
  @ViewChild('BeroepstaakModal') beroepstaakModal: any;
  @ViewChild('ProfessionalskillModal') professionalskillModal: any;
  @Input() courses: Array<any>;
  @Output() onSelectedCourse = new EventEmitter<Object>();
  allBeroepstaken: Array<any>;
  allProfessionalskills: Array<any>;
  loading: boolean;
  naam: string;
  error: boolean;
  selectedButton: number;
  currentCourse = <any>{};
  mode: string;
  formCourse = <any>{};
  toetsmatrijs: any;



  constructor(private cursusService: CursussenService, private beroepstaakService: BeroepstakenService, private professionalskillService: ProfessionalskillsService, private leerdoelenService: LeerdoelenService, private toetsenService: ToetsenService, private toetsmatrijzenService: ToetsmatrijzenService) {
    this.loading = true;
  }

  ngOnInit(): void {
    this.selectedButton = 1;
    this.formCourse = {};
    this.mode = 'view';
    this.cursusService.getCursussen().subscribe(cursussen => {
        this.courses = cursussen;
        this.currentCourse = this.courses[0];
        this.formCourse = this.courses[0];
        this.currentCourse.beroepstaken = [];
        this.currentCourse.professionalskills = [];
        this.currentCourse.toetsenlijst = [];
        this.currentCourse.toetsmatrijs = [];

        this.refreshAll();
      },
      error => console.log('Error: ', error),
      () => {
        this.loading = false;
        //console.log(this.currentCourse);
      });
  }

  changeMode(mode) {
    this.mode = mode;
  }

  deleteBeroepstaak(bt: Object) {
      this.cursusService.deleteBeroepstaak(this.currentCourse.id, bt['id']).subscribe(
        result => { this.refreshBeroepstaken();  },
        error => { this.refreshBeroepstaken();  });
  }


  deleteProfessionalskill(ps: Object) {
    alert(this.currentCourse.id);
      this.cursusService.deleteProfessionalskill(this.currentCourse.id, ps['id']).subscribe(
        result => { this.refreshProfessionalskills();  },
        error => { this.refreshProfessionalskills();  });
  }

  deleteLeerdoel(ld: Object) {
    this.cursusService.deleteLeerdoel(ld['id']).subscribe(
      result => { this.refreshLeerdoelen();  },
      error => { this.refreshLeerdoelen();  });
  }

  getAllBeroepstaken() {
      this.loading = true;
      this.beroepstaakService.getBeroepstaken().subscribe(result => {
        this.allBeroepstaken = result;
        for(let i = 0; i < this.currentCourse.beroepstaken.length; i++) {
          this.allBeroepstaken = this.allBeroepstaken.filter((x) => x.id !== this.currentCourse.beroepstaken[i].id);
        }
        this.loading = false;
      });
  }

  getAllProfessionalskills() {
      this.loading = true;
      this.professionalskillService.getProfessionalskills().subscribe(result => {
        this.allProfessionalskills = result;
        for(let i = 0; i < this.currentCourse.professionalskills.length; i++) {
          this.allProfessionalskills = this.allProfessionalskills.filter((x) => x.id !== this.currentCourse.professionalskills[i].id);
        }
        this.loading = false;
      });
  }

  addBeroepstaken() {
    let selected = this.allBeroepstaken.filter((x) => x.selected)
    this.error = false;

    if(selected.length == 0)
      this.error = true;

    if(!this.error) {
      for(let i = 0; i < selected.length; i++) {
        this.cursusService.addBeroepstakenToCursus(this.currentCourse.id, selected[i]).subscribe(x => {
          this.beroepstaakModal.hide();
          this.refreshBeroepstaken();
        });
      }
    }
  }

  addProfessionalskills() {
    let selected = this.allProfessionalskills.filter((x) => x.selected)
    this.error = false;

    if(selected.length == 0)
      this.error = true;

    if(!this.error) {
      for(let i = 0; i < selected.length; i++) {
        this.cursusService.addProfessionalskillToCursus(this.currentCourse.id, selected[i]).subscribe(x => {
          this.professionalskillModal.hide();
          this.refreshProfessionalskills();
        });
      }
    }
  }

  refreshBeroepstaken() {
    this.loading = true;
    this.beroepstaakService.getBeroepstakenByObject(this.currentCourse.eindBT).subscribe(beroepstaken => {
      this.currentCourse.beroepstaken = beroepstaken;
      this.loading = false;
    });
  }

  refreshProfessionalskills() {
    this.loading = true;
    this.professionalskillService.getProfessionalskillsByObject(this.currentCourse.eindPS).subscribe(professionalskills => {
      this.currentCourse.professionalskills = professionalskills;
      this.loading = false;
    });
  }

  refreshLeerdoelen() {
    this.loading = true;
    this.leerdoelenService.getLeerdoelenByObject(this.currentCourse.leerdoelen).subscribe(leerdoelen => {
      this.currentCourse.leerdoelenlijst = leerdoelen;
      this.loading = false;
    });
  }

  refreshToetsen() {
    this.loading = true;
    this.toetsenService.getToetsenByObject(this.currentCourse.toetsen).subscribe(toetsen => {
      this.currentCourse.toetsenlijst = toetsen;
      this.loading = false;
    });
  }

  checkbox(item) {
    item.selected = (item.selected) ? false : true;
  }

  onSelect(cour: Object) {
    this.onSelectedCourse.emit(cour);
    this.currentCourse = cour;
    this.formCourse = cour;

    this.refreshAll();

    this.selectedButton = 1;
    //console.log(this.currentCourse);
  }

  changeTab(tabnr : number) {
    this.selectedButton = tabnr;
  }

  save(form: any) {
    var formValues = form.value;
    formValues.coordinator = 1;
    console.log(formValues);
    this.cursusService.updateCursus(this.currentCourse.id, formValues).subscribe(
      data => {
        this.mode = 'view';
        this.cursusService.getCursussenByObject(this.currentCourse).subscribe(cursus => {
          this.currentCourse = cursus;
          this.formCourse = cursus;
          this.currentCourse.beroepstaken = [];
          this.currentCourse.professionalskills = [];
          this.currentCourse.toetsenlijst = [];
          this.currentCourse.toetsmatrijs = [];
          this.refreshAll();
        });
      }
    );
  }

  refreshAll() {
    // Beroepstaken
    this.refreshBeroepstaken();

    // Professional Skills
    this.refreshProfessionalskills();

    // Leerdoelen
    this.refreshLeerdoelen();

    // Toetsen
    this.refreshToetsen();


    this.generateToetsMatrijs();

    console.log(this.currentCourse);

  }

  generateToetsMatrijs() {

    this.toetsmatrijzenService.getToetsmatrijzenById(this.currentCourse.id).subscribe(toetsmatrijs => {

      console.log(toetsmatrijs);

      var totalCells = 4; // De eerste 4 cells gereserveerd voor benaming van leerdoelen
      var totalRows = toetsmatrijs.leerdoelen.length+2; // +2 voor de benaming van toetsen

      for (let i = 0; i < toetsmatrijs.toetsen.length; i++) {
        totalCells += toetsmatrijs.toetsen[i].beoordelingsElementen.length;
      }


      console.log("Total rows:" + totalRows);

      console.log("Total cells:" + totalCells);

      let toetsmatrijsArray = Array.apply(null, Array(totalRows)); // Rows aanmaken

      for(let i = 0; i < toetsmatrijsArray.length; i++) {
        toetsmatrijsArray[i] = Array.apply(null, Array(totalCells)); // Cellen aanmaken
      }

      var toetsPosition = 4;
      for(let i = 0; i < toetsmatrijs.toetsen.length; i++) {
        toetsmatrijsArray[0][toetsPosition] = toetsmatrijs.toetsen[i].naam;


        for(let j = 0; j < toetsmatrijs.toetsen[i].beoordelingsElementen.length; j++) {
          toetsmatrijsArray[1][toetsPosition+j] = toetsmatrijs.toetsen[i].beoordelingsElementen[j];
        }

        toetsPosition += toetsmatrijs.toetsen[i].beoordelingsElementen.length;
      }


      for(let i = 0; i < toetsmatrijs.leerdoelen.length; i++) {
        toetsmatrijsArray[2 + i][0] = toetsmatrijs.leerdoelen[i].eindPS.naam;
        toetsmatrijsArray[2 + i][1] = toetsmatrijs.leerdoelen[i].eindBT.naam;
        toetsmatrijsArray[2 + i][2] = "LD-" + toetsmatrijs.leerdoelen[i].id;
        toetsmatrijsArray[2 + i][3] = toetsmatrijs.leerdoelen[i].bloomniveau.naam;
        for (let p = 0; p < toetsmatrijs.leerdoelen[i].toetsElementen.length; p++) {
          var idToetsElement = toetsmatrijs.leerdoelen[i].toetsElementen[p].beoordelingsElement.id;
          for (let j = 0; j < toetsmatrijsArray[1].length; j++) {
            if (j > 3) {
              if (idToetsElement == toetsmatrijsArray[1][j].id) {
                 toetsmatrijsArray[2 + i][j] = toetsmatrijs.leerdoelen[i].toetsElementen[p];
              }
            }
          }
        }
      }

      this.currentCourse.toetsmatrijs = toetsmatrijsArray;
    });

  }
}
