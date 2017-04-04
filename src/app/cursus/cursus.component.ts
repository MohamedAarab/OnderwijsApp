import { Component, OnInit, EventEmitter, Input, Output, } from '@angular/core';
import { CursusService } from './cursus.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'courses',
    templateUrl: 'cursus.component.html',
    providers: [CursusService]
})

export class CursussenComponent{
    @Input() courses: Array<Object>;
    @Output() onSelectedCourse = new EventEmitter<Object>();
    courses : Array<Object>;
    loading : boolean;
    naam : string;
    currentCourse = <any>{};

    constructor(private cursusService: CursusService){
      this.loading = true;
    }

    ngOnInit() {
      this.cursusService.getCursussen().subscribe(cursussen => {
          this.courses = cursussen;
          console.log(this.courses);
          this.currentCourse = this.courses[0];
          for(let j = 0; j < this.courses.length; j++) {
            //console.log(this.courses[j].leerdoelen);
            for(let i = 0; i < this.courses[j].leerdoelen.length; i++){
              this.cursusService.getDataByHref(this.courses[j].leerdoelen[i].href)
                .subscribe(leerdoelen => {

                  this.courses[j].leerdoelen[i].data = leerdoelen;
                    if(this.courses[j].leerdoelen[i].data.bloomniveau != null) {
                      this.cursusService.getDataByHref(this.courses[j].leerdoelen[i].data.bloomniveau.href)
                        .subscribe(bloomniveau => {
                          this.courses[j].leerdoelen[i].data.bloomniveau.data = bloomniveau;
                        });
                    }
                  },
                  error => console.log("Error: ", error));
            }

            for(let i = 0; i < this.courses[j].eindBT.length; i++){
              // console.log(i);
              // console.log(i);
              this.cursusService.getDataByHref(this.courses[j].eindBT[i].href)
                .subscribe(beroepstaken => {
                    //console.log(i);
                    this.courses[j].eindBT[i].data = beroepstaken;
                  },
                  error => console.log("Error: ", error));
            }

            for(let i = 0; i < this.courses[j].eindPS.length; i++){
              this.cursusService.getDataByHref(this.courses[j].eindPS[i].href)
                .subscribe(professionalskills => {
                  this.courses[j].eindPS[i].data = professionalskills;
                });
            }

            this.cursusService.getDataByHref(this.courses[j].coordinator.href)
              .subscribe(coordinator => {
                this.courses[j].coordinator.data = coordinator;
              });
          }
        },
        error => console.log("Error: ", error),
        () => {
          this.loading = false;
          console.log(this.currentCourse);
          //console.log(this.currentCourse.eindBT[0].data);
        });

    }

    onSelect(cour:Object) {
        this.onSelectedCourse.emit(cour);
        this.currentCourse = cour;
        console.log(this.currentCourse);
    }
}
