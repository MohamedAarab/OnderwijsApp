import {
    Component,
    OnInit,
    EventEmitter,
    Input,
    Output,
} from '@angular/core';
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
    courses:Array<Object>;
    currentCourse = {};


    constructor(private cursusService: CursusService){
      this.cursusService.getCursussen().subscribe(cursussen => {
        this.courses = cursussen;
        this.currentCourse = this.courses[0];
      });
//      this.currentCourse = this.courses[0];
//      console.log(this.currentCourse);
    }

    onSelect(cour:Object) {
        this.onSelectedCourse.emit(cour);
        this.currentCourse = cour;
        console.log(this.currentCourse);
    }
}
