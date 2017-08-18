import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild, Directive} from '@angular/core';
import { Router } from '@angular/router';
import { DocentenService } from './docenten.service';
import {AbstractControl, NG_VALIDATORS} from '@angular/forms';
import {OrderByPipe} from './orderby.pipe';

@Component({
	templateUrl: 'docenten.component.html',
//	pipes: [OrderByPipe]
})

export class DocentenComponent implements OnInit {
    @ViewChild('newDocentModal') newDocentModal: any;
    @ViewChild('editDocentModal') editDocentModal: any;
    @ViewChild('docentModal') docentModal: any;
    @Input() docenten: Array<any>;
    loading: boolean;
    currentState: number;
    mode: string;
    docentForm = <any>{};
    docentId: number;

    constructor(private docentenService: DocentenService) {
        this.loading = true;
    }

    ngOnInit(): void {
        this.docentenService.getDocenten().subscribe(docenten => {
          this.docenten = docenten;
        },
        error => console.log('Error: ', error),
        () => {
          this.loading = false;
        });
    }

    initializeDocentForm() {
        this.docentForm = {};
    }

    saveDocent() {
        this.loading = false;
        this.docentenService.saveDocent(this.docentId, this.docentForm).subscribe(docent => {
          this.refreshDocenten();
          this.docentModal.hide();
          this.loading = false;
        });
      }

    getDocent(docent) {
      this.docentId = docent.id;
      this.docentForm.naam = docent.naam;
    }

    refreshDocenten() {
      this.loading = true;
      this.docentenService.getDocenten().subscribe(docenten => {
        this.docenten = docenten;
        this.loading = false;
      });
    }

    isEmptyObject(obj) {
      return (Object.keys(obj).length === 0);
    }
}
