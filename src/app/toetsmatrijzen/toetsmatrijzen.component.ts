import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { Router } from '@angular/router';
import {ToetsmatrijzenService} from './toetsmatrijzen.service';

@Component({
  templateUrl: 'toetsmatrijzen.component.html',
})
export class ToetsmatrijzenComponent implements OnInit {

  @Input() courses: Array<any>;
  @Output() onSelectedCourse = new EventEmitter<Object>();
  loading: boolean;
  naam: string;
  selectedButton : number;
  currentCourse = <any>{};

  constructor(private cohortService: ToetsmatrijzenService) {
    this.loading = true;
  }

  ngOnInit(): void {
    // this.selectedButton = 1;
    // this.cursusService.getCursussen().subscribe(cursussen => {
    //     this.courses = cursussen;
    //     console.log(this.courses);
    //     this.currentCourse = this.courses[0];
    //     for(let j = 0; j < this.courses.length; j++) {
    //       for(let i = 0; i < this.courses[j].toetsmatrijzen.length; i++){
    //         this.cursusService.getDataByHref(this.courses[j].toetsmatrijzen[i].href)
    //           .subscribe(toetsmatrijzen => {
    //
    //               this.courses[j].toetsmatrijzen[i].data = toetsmatrijzen;
    //               if(this.courses[j].toetsmatrijzen[i].data.bloomniveau != null) {
    //                 this.cursusService.getDataByHref(this.courses[j].toetsmatrijzen[i].data.bloomniveau.href)
    //                   .subscribe(bloomniveau => {
    //                     this.courses[j].toetsmatrijzen[i].data.bloomniveau.data = bloomniveau;
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
