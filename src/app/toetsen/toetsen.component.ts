import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { Router } from '@angular/router';
import {ToetsenService} from './toetsen.service';

@Component({
  templateUrl: 'toetsen.component.html',
})
export class ToetsenComponent implements OnInit {

  @Input() courses: Array<any>;
  @Output() onSelectedCourse = new EventEmitter<Object>();
  loading: boolean;
  naam: string;
  selectedButton : number;
  currentCourse = <any>{};

  constructor(private cohortService: ToetsenService) {
    this.loading = true;
  }

  ngOnInit(): void {
  }

  onSelect(cour:Object) {
    this.onSelectedCourse.emit(cour);
    this.currentCourse = cour;
    this.selectedButton = 1;
    console.log(this.currentCourse);
  }

  changeTab(tabnr : number) {
    this.selectedButton = tabnr;
  }
}
