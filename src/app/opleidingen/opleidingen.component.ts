import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { Router } from '@angular/router';
import {OpleidingenService} from './opleidingen.service';

@Component({
  templateUrl: 'opleidingen.component.html',
})
export class OpleidingenComponent implements OnInit {

  @Input() opleidingen: Array<any>;
  @Output() onSelectedOpleiding = new EventEmitter<Object>();
  loading: boolean;
  naam: string;
  selectedButton: number;
  selectedOpleiding = <any>{};

  constructor(private opleidingenService: OpleidingenService) {
    this.loading = true;
  }

	ngOnInit(): void {
		this.selectedButton = 1;
		this.cursusForm = {};
		this.mode = 'view';
		this.opleidingenService.getOpleidingen().subscribe(opleidingen => {
			this.opleidingen = opleidingen;
			console.log(this.opleidingen);
			this.selectedOpleiding = this.opleidingen[0];
			this.opleidingForm = this.opleidingen[0];
			this.refreshAll();
		}, error => console.log('Error: ', error),
			() => {
				this.loading = false;
				// console.log(this.currentCourse);
		});
	}

	onSelect(opleiding:Object) {
		this.onSelectedOpleiding.emit(cour);
		this.selectedOpleiding = opleiding;
		this.selectedButton = 1;
		console.log(this.selectedOpleiding);
	}

	changeTab(tabnr : number) {
		this.selectedButton = tabnr;
	}
}
