import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild, Directive} from '@angular/core';
import {Router} from '@angular/router';
import {AbstractControl, NG_VALIDATORS} from '@angular/forms';

@Directive({
	  selector: '[bt-overzicht]',
	})

@Component({
	template: '<h4>bt-overzicht.component.html</h4>',
})
export class BtOverzichtComponent implements OnInit {
	selectedObject = <any>{};
	
	ngOnInit(): void {
		let btMatrix = this.generateMatrix();
		this.selectedObject.btMatrix = btMatrix;
	}
	
	show(selected: any) {
		this.selectedObject = selected;
		console.log("show");
		console.log(this.selectedObject);
	}

	generateMatrix() {
		let btMatrix = Array.apply(null, Array(6));
		for(let i = 0; i < btMatrix.length; i++) {
			btMatrix[i] = Array.apply(null, Array(6));
		}
		btMatrix[0][1] = 'B';
		btMatrix[0][2] = 'A';
		btMatrix[0][3] = 'A';
		btMatrix[0][4] = 'O';
		btMatrix[0][5] = 'R';
		btMatrix[1][0] = 'G';
		btMatrix[2][0] = 'B';
		btMatrix[3][0] = 'I';
		btMatrix[4][0] = 'S';
		btMatrix[5][0] = 'H';
		return btMatrix;
	}
}
