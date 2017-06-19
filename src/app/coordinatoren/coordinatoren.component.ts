import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild, Directive} from '@angular/core';
import { Router } from '@angular/router';
import { CoordinatorenService } from './coordinatoren.service';
import {AbstractControl, NG_VALIDATORS} from '@angular/forms';

@Component({
  templateUrl: 'coordinatoren.component.html',
})
export class CoordinatorenComponent implements OnInit {
    @ViewChild('CoordinatorModal') CoordinatorModal: any;
    @Input() coordinatoren: Array<any>;
    loading: boolean;
    currentState: number;
    newCoordinator = <any>{};
    mode: string;

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

    addCoordinator(form: any) {
      var formValues = form.value;
      this.coordinatorenService.addCoordinator(1, formValues).subscribe(coordinator => {
          this.CoordinatorModal.hide();
          this.newCoordinator = coordinator;
          this.refreshCoordinatoren();
      });
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
