import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { Router } from '@angular/router';
import {OrganisatiesService} from './organisaties.service';

@Component({
  templateUrl: 'organisaties.component.html',
})
export class OrganisatiesComponent implements OnInit {

  @Input() courses: Array<any>;
  @Output() onSelectedCourse = new EventEmitter<Object>();
  loading: boolean;
  naam: string;
  selectedButton: number;
  currentCourse = <any>{};

  constructor(private organisatieService: OrganisatiesService) {
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
