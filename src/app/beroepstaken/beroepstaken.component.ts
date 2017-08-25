import {Component, Injectable, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild, Directive} from '@angular/core';
import { Router } from '@angular/router';
import { BeroepstakenService } from './beroepstaken.service';
import { AbstractControl, NG_VALIDATORS } from '@angular/forms';

@Component({
	templateUrl: 'beroepstaken.component.html',
})
@Injectable()
export class BeroepstakenComponent implements OnInit {
    @ViewChild('beroepstaakModal') beroepstaakModal: any;
    @Input() selectedBeroepstaak: any;
    loading: boolean;
	allBeroepstaken: Array<any>;
	beroepstakenForm = <any>{};
	beroepstakenTypes = <any>{};

    constructor(private beroepstakenService: BeroepstakenService) {
        this.loading = true;
    }

	ngOnInit(): void {	
	}
	
	getBeroepstaakTypes() {
		this.loading = true;
		this.beroepstakenService.getBeroepstaakTypes().subscribe(result => {
			this.beroepstakenTypes = result;
			this.beroepstakenForm = {architectuurlaag: 1, activiteit: 1, niveau: 1};
			this.loading = false;
		});
	}
	
	showModal() {
		this.getBeroepstaakTypes();
		console.log(this.beroepstakenTypes);
		this.beroepstaakModal.show();
	}

	
}
