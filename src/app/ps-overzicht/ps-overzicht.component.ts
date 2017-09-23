import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild, Directive} from '@angular/core';

@Component({
	selector: 'ps-overzicht',
	templateUrl: 'ps-overzicht.component.html',
})
export class PsOverzichtComponent {
	private _professionalskills: Array<any>;
	 
	@Input()
	set professionalskills(professionalskills: Array<any>) {
		console.log("SET this._professionalskills");
		this._professionalskills = professionalskills;
		console.log(this._professionalskills);
	}

	get professionalskills(): Array<any> {return this._professionalskills;}
	
}
