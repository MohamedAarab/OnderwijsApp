import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild, Directive} from '@angular/core';
import { Router } from '@angular/router';
import { CoordinatorenService } from './coordinatoren.service';
import {AbstractControl, NG_VALIDATORS} from '@angular/forms';

@Component({
  templateUrl: 'coordinatoren.component.html',
})
export class CoordinatorenComponent implements OnInit {
    @ViewChild('CoordinatorModal') CoordinatorModal: any;
    @ViewChild('editCoordinatorModal') editCoordinatorModal: any;
    @Input() coordinatoren: Array<any>;
    loading: boolean;
    currentState: number;
    newCoordinatorForm = <any>{};
    editCoordinatorForm = <any>{};
    mode: string;
    editCoordinatorId: number;

    constructor(private coordinatorenService: CoordinatorenService) {
        this.loading = true;
    }

    ngOnInit(): void {
        this.coordinatorenService.getCoordinatoren().subscribe(coordinatoren => {
          this.coordinatoren = coordinatoren;
        },
        error => console.log('Error: ', error),
        () => {
          this.loading = false;
        });
    }

    addCoordinator() {
      this.loading = true;
      this.coordinatorenService.addCoordinator(this.newCoordinatorForm).subscribe(coordinator => {
          this.refreshCoordinatoren();
          this.CoordinatorModal.hide();
          this.loading = false;
      });
    }

    initializeCoordinatorForm() {
        this.newCoordinatorForm = {};
    }
    // save(form: any) {
    //     var formValues = form.value;
    //     this.coordinatorenService.updateCoordinator(this.currentCourse.id, formValues).subscribe(data => {
    //         this.mode = 'view';
    //         this.coordinatorenService.getCursussenByObject(this.currentCourse).subscribe(cursus => {
    //             this.currentCourse = cursus;
    //             this.formCourse = cursus;
    //             this.currentCourse.beroepstaken = [];
    //             this.currentCourse.professionalskills = [];
    //             this.currentCourse.toetsenlijst = [];
    //             this.currentCourse.toetsmatrijs = [];
    //             this.refreshAll();
    //         });
    //     });
    // }

    editCoordinator() {
      this.loading = false;
      this.coordinatorenService.editCoordinator(this.editCoordinatorId, this.editCoordinatorForm).subscribe(coordinator => {
        this.refreshCoordinatoren();
        this.editCoordinatorModal.hide();
        this.loading = false;
      });
    }

    getCoordinator(coor) {
      this.editCoordinatorId = coor.id;
      this.editCoordinatorForm.naam = coor.naam;
    }

    refreshCoordinatoren() {
      this.loading = true;
      this.coordinatorenService.getCoordinatoren().subscribe(coordinatoren => {
        this.coordinatoren = coordinatoren;
        this.loading = false;
      });
    }

    isEmptyObject(obj) {
      return (Object.keys(obj).length === 0);
    }
}
