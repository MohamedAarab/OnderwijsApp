import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import {CursussenService} from './cursussen.service';
import {BeroepstakenService} from '../beroepstaken/beroepstaken.service';
import {ProfessionalskillsService} from '../professionalskills/professionalskills.service';
import {LeerdoelenService} from "../leerdoelen/leerdoelen.service";

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
  selectedButton : number;
  currentCourse = <any>{};

  constructor(private cursusService: CursussenService, private beroepstaakService: BeroepstakenService, private professionalskillService: ProfessionalskillsService, private leerdoelenService: LeerdoelenService) {
    this.loading = true;
  }

  ngOnInit(): void {
    this.selectedButton = 1;
    this.cursusService.getCursussen().subscribe(cursussen => {
        this.courses = cursussen;
        this.currentCourse = this.courses[0];
        this.currentCourse.beroepstaken = [];
        this.currentCourse.professionalskills = [];

        // Beroepstaken
        this.refreshBeroepstaken();

        // Professional Skills
        this.refreshProfessionalskills();

        // Leerdoelen
        this.refreshLeerdoelen();
      },
      error => console.log('Error: ', error),
      () => {
        this.loading = false;
        console.log(this.currentCourse);
      });
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

  checkbox(item) {
    item.selected = (item.selected) ? false : true;
  }

  onSelect(cour: Object) {
    this.onSelectedCourse.emit(cour);
    this.currentCourse = cour;

    // Beroepstaken
    this.refreshBeroepstaken();

    // Professional Skills
    this.refreshProfessionalskills();

    // Leerdoelen
    this.refreshLeerdoelen();

    this.selectedButton = 1;
    console.log(this.currentCourse);
  }

  changeTab(tabnr : number) {
    this.selectedButton = tabnr;
  }
}
