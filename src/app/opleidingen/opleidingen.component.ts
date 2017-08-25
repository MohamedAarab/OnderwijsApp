import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild, Directive} from '@angular/core';
import {Router} from '@angular/router';
import {OrderByPipe} from './orderby.pipe';
import {CursussenService} from '../cursussen/cursussen.service';
import {BeroepstakenService} from '../beroepstaken/beroepstaken.service';
import {ProfessionalskillsService} from '../professionalskills/professionalskills.service';
import {AbstractControl, NG_VALIDATORS} from '@angular/forms';
import {OpleidingenService} from './opleidingen.service';

import {CohortenService} from '../services/cohorten.service';
import {LeerplannenService} from '../services/leerplannen.service';
import {BtOverzichtComponent} from '../bt-overzicht/bt-overzicht.component';

@Component({
	templateUrl: 'opleidingen.component.html',
})
export class OpleidingenComponent implements OnInit {
	opleidingen: Array<any>;
	@Input() cursussen: Array<any>;
	@Output() onSelectedOpleiding = new EventEmitter<Object>();

	@ViewChild('OpleidingModal') opleidingModal: any;
	selectedOpleiding = <any>{};
	opleidingForm = <any>{};
	
	cohorten: Array<any>;
    selectedCohort = <any>{};

	@ViewChild('BeroepstaakModal') beroepstaakModal: any;
	allBeroepstaken: Array<any>;
	beroepstakenForm = <any>{};
	beroepstakenTypes = <any>{};

	@ViewChild('ProfessionalskillModal') professionalskillModal: any;
	allProfessionalskills: Array<any>;
	professionalskillsTypes = <any>{};
	professionalskillForm = <any>{};

	@ViewChild('CursusModal') cursusModal: any;
    availableCursussen: Array<any>;
    allCursussen: Array<any>;
	cursusForm = <any>{};

	loading: boolean;
	naam: string;
	selectedButton: number;
	mode: string; 

	constructor(private opleidingenService: OpleidingenService, 
			private cohortenService: CohortenService,
			private cursussenService: CursussenService,
			private leerplannenService: LeerplannenService,
			private professionalskillService: ProfessionalskillsService, 
			private beroepstakenService: BeroepstakenService,
			private btOverzichtComponent: BtOverzichtComponent) {
		this.loading = true;
	}

	ngOnInit(): void {
        this.cursussen = [];
        this.allCursussen = [];
		this.selectedButton = 1;
		this.mode = 'view';
		this.opleidingenService.getOpleidingen().subscribe(opleidingen => {
			this.opleidingen = opleidingen;
			console.log(this.opleidingen);
			this.onSelectOpleiding(this.opleidingen[0]);
		}, error => console.log('Error: ', error),
		() => {
			this.loading = false;
		});
	}

	setMode(mode) {
		this.mode = mode;
	}

	onSelectOpleiding(opleiding:Object) {
		this.onSelectedOpleiding.emit(opleiding);
		this.selectedOpleiding = opleiding;
		let btMatrix = this.generateMatrix();
		this.selectedOpleiding.btMatrix = btMatrix;
		this.loadBeroepstaken();
		this.btOverzichtComponent.show(this.selectedOpleiding);
		this.refreshProfessionalskills();

        this.cohortenService.getCohortenByObject(this.selectedOpleiding['cohorten']).subscribe(cohorten => {
            this.cohorten = cohorten;
            this.selectedCohort = cohorten[0];
    		console.log(this.selectedOpleiding);
    		console.log(this.selectedCohort);
    		this.refreshCursussen();
            this.loading = false;
        });
	}

	changeTab(tabnr : number) {
		this.selectedButton = tabnr;
	}

	saveOpleiding(form: any) {
		this.loading = true;
		this.selectedOpleiding.naam = form.naam;
		console.log(this.selectedOpleiding);
		this.opleidingenService.saveOpleiding(this.selectedOpleiding).subscribe(x => {
			this.mode = 'view';
			this.loading = false;
		});
	}

	// ******************
	// Beroepstaak operaties
	// ******************

	getBeroepstaakTypes() {
		this.loading = true;
		this.beroepstakenService.getBeroepstaakTypes().subscribe(result => {
			this.beroepstakenTypes = result;
			this.beroepstakenForm = {architectuurlaag: 1, activiteit: 1, niveau: 1};
			this.loading = false;
		});
	}

	getAllBeroepstaken() {
		this.loading = true;
		this.beroepstakenService.getBeroepstaken().subscribe(result => {
			this.allBeroepstaken = result;
			for(let bt of this.selectedOpleiding.beroepstaken) {
				this.allBeroepstaken = this.allBeroepstaken.filter((x) => x.id !== bt.id);
			}
			this.loading = false;
		});
	}
	
	loadBeroepstaken() {
		this.beroepstakenService.getBeroepstakenByObject(this.selectedOpleiding.eindBT).subscribe(beroepstaken => {
			this.selectedOpleiding.beroepstaken = [];
			this.selectedOpleiding.beroepstaken = beroepstaken;
			for (let bt of this.selectedOpleiding.beroepstaken) {
				this.selectedOpleiding.btMatrix[bt.architectuurlaagId][bt.activiteitId] = bt;
			}

		});
	}

	addBeroepstaak() {
		this.loading = true;
		this.beroepstakenService.getBeroepstaakId(this.beroepstakenForm.activiteit,
			this.beroepstakenForm.architectuurlaag,
			this.beroepstakenForm.niveau).subscribe(data => {
				this.opleidingenService.addBeroepstakenToOpleiding(this.selectedOpleiding.id, data).subscribe(x => {
					this.selectedOpleiding.beroepstaken = this.loadBeroepstaken();
					this.loading = false;
				});
			});
	}

	deleteBeroepstaak(bt: Object) {
		this.opleidingenService.deleteBeroepstaak(this.selectedOpleiding.id, bt['id']).subscribe(
				result => { this.selectedOpleiding.beroepstaken = this.loadBeroepstaken(); },
				error => { this.selectedOpleiding.beroepstaken = this.loadBeroepstaken(); });
	}

	// ******************
	// Professional skills operaties
	// ******************

	refreshProfessionalskills() {
		this.professionalskillService.getProfessionalskillsByObject(this.selectedOpleiding.eindPS).subscribe(professionalskills => {
			this.selectedOpleiding.professionalskills = professionalskills;
		});
	}
	
	getProfessionalskillTypes() {
		this.loading = true;
		this.professionalskillService.getProfessionalskillsTypes().subscribe(result => {
			this.professionalskillsTypes = result;
			this.professionalskillForm = {activiteit: 6, niveau: 'T'};
			this.loading = false;
		});
	}

	addProfessionalskill() {
		this.loading = true;
		this.professionalskillService.getProfessionalskillId(this.professionalskillForm.activiteit, this.professionalskillForm.niveau).subscribe(data => {
			this.opleidingenService.addProfessionalskillToOpleiding(this.selectedOpleiding.id, data).subscribe(x => {
				this.professionalskillModal.hide();
				this.refreshProfessionalskills();
				this.loading = false;
			});
		});
	}

	deleteProfessionalskill(ps: Object) {
		this.opleidingenService.deleteProfessionalskill(this.selectedOpleiding.id, ps['id']).subscribe(
				result => { this.refreshProfessionalskills(); },
				error => { this.refreshProfessionalskills(); });
	}
	
	refreshCursussen() {
		console.log("refreshCursussen")
		console.log(this.selectedCohort)
		this.cursussenService.getCursussenByObject(this.selectedCohort.cursussen).subscribe(cur => {
			this.cursussen = cur;
			console.log(this.cursussen);
			for(let c of this.cursussen) {
				this.beroepstakenService.getBeroepstakenByObject(c.eindBT).subscribe(beroepstaken => {
					c.beroepstaken = [];
					c.beroepstaken = beroepstaken;
					console.log("c.beroepstaken");
					console.log(c.beroepstaken);
					let btMatrix = this.generateMatrix();
					for (let bt of c.beroepstaken) {
						btMatrix[bt.architectuurlaagId][bt.activiteitId] = bt;
					}
					c.btMatrix = btMatrix;
					this.professionalskillService.getProfessionalskillsByObject(c.eindPS).subscribe(professionalskills => {
						c.professionalskills = [];
						c.professionalskills = professionalskills;
					});
				});
			}
		});
    }


	closeModal(modal) {
		this.loading = false;
		modal.hide()
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

	isEmptyObject(obj) {
		return (Object.keys(obj).length === 0);
	}
	
	initializeOpleidingForm() {
		this.opleidingForm = {};
	}
	
	addOpleiding() {
		this.loading = true;
		delete this.opleidingForm.code;
		console.log(this.opleidingForm);
		this.opleidingenService.saveOpleiding(this.opleidingForm).subscribe(x => {
			this.opleidingen.push(this.opleidingForm);
			this.onSelectOpleiding(this.opleidingForm);
			this.closeModal(this.opleidingModal);
		});
	}
	
    addCursusToCohort(form: any) {
        this.loading = true;
        console.log(form)
        console.log("addCursusToCohort "+this.selectedCohort.id+" "+form)
        this.cohortenService.addCursusToCohort(this.selectedCohort.id, form).subscribe(data => {
            this.cursusModal.hide();
// this.cursusForm = data;
            this.onSelectOpleiding(this.selectedOpleiding);
            this.loading = false;
        });
    }

    deleteCursusFromCohort(cursus: any) {
    	console.log("deleteCursusFromCohort "+this.selectedCohort.id)
    	console.log(cursus)
        this.cohortenService.deleteCursus(this.selectedCohort.id, cursus.id).subscribe(result => {
            this.onSelectOpleiding(this.selectedOpleiding);
        }, error => { });
    }

    initializeCursusForm() {
        this.loading = true;
   		this.cursusForm = {};
        console.log('1 this.cursussen');
        console.log(this.cursussen);
    	this.cursussenService.getCursussen().subscribe(data => {
            console.log('2 data');
            console.log(data);
    		this.allCursussen = data;
            console.log('3 this.allCursussen');
            console.log(this.allCursussen);
    		let selectedCursus = this.cursussen[0];
    		this.cursusForm = {cursus: selectedCursus};
            this.availableCursussen = this.allCursussen;
            console.log('4 this.availableCursussen');
            console.log(this.availableCursussen);
            for (let c of this.cursussen) {
                this.availableCursussen = this.availableCursussen.filter((x) => x.id !== c.id);
            }
            console.log('this.availableCursussen');
            console.log(this.availableCursussen);
            var id = 0;
            if (this.availableCursussen.length > 0){
                id = this.availableCursussen[0].id;
            }
            this.cursusForm = {id: id};
            this.loading = false;
    	});
    }

// onSelectCohort(coh: Object) {
// this.loading = true;
// this.cursusService.getCursussenByObject(coh['cursussen']).subscribe(cur => {
// this.cursussen = cur;
// for(let index = 0; index < this.cursussen.length; index++) {
// this.beroepstaakService.getBeroepstakenByObject(this.cursussen[index].eindBT).subscribe(beroepstaken
// => {
// this.cursussen[index].beroepstaken = [];
// let btMatrix = this.generateMatrix();
//
// //console.log(beroepstaken);
// for(let btIndex = 0; btIndex < beroepstaken.length; btIndex++) {
// btMatrix[beroepstaken[btIndex].architectuurlaagId][beroepstaken[btIndex].activiteitId]
// = beroepstaken[btIndex];
// //
// btMatrix[beroepstaken[btIndex].architectuurlaagId][beroepstaken[btIndex].activiteitId]
// = beroepstaken[btIndex];
// this.cursussen[index].beroepstaken.push(beroepstaken[btIndex]);
// }
// this.cursussen[index].btMatrix = btMatrix;
// });
//
// this.professionalskillService.getProfessionalskillsByObject(this.cursussen[index].eindPS).subscribe(professionalskills
// => {
// this.cursussen[index].professionalskills = [];
// for(let j = 0; j < professionalskills.length; j++) {
// this.cursussen[index].professionalskills.push(professionalskills[j]);
// }
// });
//
// }
// this.selectedCohort = coh;
// this.loading = false;
// });
// }


}
