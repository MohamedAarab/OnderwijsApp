import {
    Component,
    OnInit,
    EventEmitter,
    Input,
    Output,
} from '@angular/core';
import { Course } from './course';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'courses',
    templateUrl: 'courses.component.html',
})

export class CoursesComponent{
    @Input() courses: Array<Course>;
    @Output() onSelectedCourse = new EventEmitter<Course>();
    courses:Array<Course>;
    currentCourse: Course;

    ngOnInit() {
        this.currentCourse = this.courses[0];
    }

    courses = [
        new Course(1, "TICT-V1PROG-15", "Programming", 1, 5, "Berend Wilkens", "Geen"),
        new Course(2, "TICT-V1ICOR-15", "ICT and Organisation", 1, 5, "Berend Wilkens", "Geen"),
        new Course(3, "TICT-V1CSN-15", "Computer, system and network", 1, 5, "Berend Wilkens", "Geen"),
    ]



    onSelect(cour:Course) {
        this.onSelectedCourse.emit(cour);
        this.currentCourse = cour;
    }
}