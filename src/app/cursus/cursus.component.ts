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
    currentCourse = <any>{};

    constructor(private cursusService: CursusService){
        this.cursusService.getCursussen().subscribe(cursussen => {
            this.courses = cursussen;
            this.currentCourse = this.courses[0];
        },
        error => console.log("Error: ", error),
        () => {

            for(var i = 0; i < this.currentCourse.leerdoelen.length; i++){
                this.cursusService.getDataByHref(this.currentCourse.leerdoelen[i].href)
                    .subscribe(leerdoelen => {
                        this.currentCourse.leerdoelen[i - 1].data = leerdoelen;
                },
                error => console.log("Error: ", error),
                () => {
                    this.cursusService.getDataByHref(this.currentCourse.leerdoelen[i - 1].data.bloomniveau.href)
                        .subscribe(bloomniveau => {
                            this.currentCourse.leerdoelen[i - 1].data.bloomniveau.data = bloomniveau;
                    });
                });
            }

            // for(var i = 0; i < this.currentCourse.eindBT.length; i++){
            //     // console.log(i);
            //     console.log(i);
            //     this.cursusService.getDataByHref(this.currentCourse.eindBT[i].href)
            //         .subscribe(beroepstaken => {
            //             this.currentCourse.eindBT[i - 1].data = beroepstaken;
            //             console.log(this.currentCourse.eindBT);
            //     },
            //     error => console.log("Error: ", error),
            //     () => {
            //         i++;
            //     });
            //     continue;
            // }

            for(var i = 0; i < this.currentCourse.eindPS.length; i++){
                this.cursusService.getDataByHref(this.currentCourse.eindPS[i].href)
                    .subscribe(professionalskills => {
                        this.currentCourse.eindPS[i - 1].data = professionalskills;
                });
            }

            this.cursusService.getDataByHref(this.currentCourse.coordinator.href)
                .subscribe(coordinator => {
                    this.currentCourse.coordinator.data = coordinator;
            });
            console.log(this.currentCourse);
        });
    }

    onSelect(cour:Object) {
        this.onSelectedCourse.emit(cour);
        this.currentCourse = cour;
        console.log(this.currentCourse);
    }
}
