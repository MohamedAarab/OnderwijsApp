import { Component, Input } from '@angular/core';
import { Docent } from './docent';

@Component({
	selector: 'docent-naam',
	template: '<div *ngIf="docent"><h2>{{docent}} details!</h2></div>'
})
export class DocentComponent {
	@Input() docent: string;
}