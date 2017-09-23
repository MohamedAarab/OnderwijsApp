import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild, Directive} from '@angular/core';

@Component({
	selector: 'bt-matrix',
	templateUrl: 'bt-matrix.component.html',
})
export class BtMatrixComponent {
	private _beroepstaken: Array<any>;
	matrix: Array<any>;
	 
	@Input()
	set beroepstaken(beroepstaken: Array<any>) {
		console.log("SET this._beroepstaken");
		this._beroepstaken = beroepstaken;
		console.log(this._beroepstaken);
		this.matrix = this.generateMatrix("-");
		if (this._beroepstaken != null){ 
			for (let bt of this._beroepstaken) {
				this.matrix[bt.architectuurlaagId][bt.activiteitId] = bt;
			}
		}
	}

	get beroepstaken(): Array<any> {return this._beroepstaken;}
	
	ngOnInit(): void {
		this.matrix = this.generateMatrix("x");
		if (this._beroepstaken != null){ 
			for (let bt of this._beroepstaken) {
				this.matrix[bt.architectuurlaagId][bt.activiteitId] = bt;
			}
		}
		console.log('this.matrix');
		console.log(this.matrix);
	}
	

	
	generateMatrix(teken : string) {
		let btMatrix = Array.apply(null, Array(6));
		for(let i = 0; i < btMatrix.length; i++) {
			btMatrix[i] = Array.apply(null, Array(6));
		}
		btMatrix[0][0] = teken;
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
