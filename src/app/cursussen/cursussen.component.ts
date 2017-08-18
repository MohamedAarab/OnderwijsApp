import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild, Directive} from '@angular/core';
import { Router } from '@angular/router';
import {CursussenService} from './cursussen.service';
import {BeroepstakenService} from '../beroepstaken/beroepstaken.service';
import {ProfessionalskillsService} from '../professionalskills/professionalskills.service';
import {LeerdoelenService} from '../leerdoelen/leerdoelen.service';
import {ToetsenService} from '../toetsen/toetsen.service';
import {AbstractControl, NG_VALIDATORS} from '@angular/forms';
import {ToetsmatrijzenService} from "../toetsmatrijzen/toetsmatrijzen.service";
import {BloomniveausService} from "../bloomniveaus/bloomniveaus.service";
import {DocentenService} from "../docenten/docenten.service";

@Component({
	templateUrl: 'cursussen.component.html',
})
export class CursussenComponent implements OnInit {
	@ViewChild('BeroepstaakModal') beroepstaakModal: any;
	@ViewChild('ProfessionalskillModal') professionalskillModal: any;
	@ViewChild('LeerdoelModal') leerdoelModal: any;
	@ViewChild('BeoordelingselementModal') beoordelingselementModal: any;
	@ViewChild('CursusModal') cursusModal: any;
	@ViewChild('ToetsModal') toetsModal: any;
	@Input() courses: Array<any>;
	@Output() onSelectedCourse = new EventEmitter<Object>();
	allBeroepstaken: Array<any>;
	allProfessionalskills: Array<any>;
	allDocenten: Array<any>;
	allBloomniveaus: Array<any>;
	allOsirisResultaatTypen: Array<any>;
	loading: boolean;
	naam: string;
	error: boolean;
	currentCourse = <any>{};
	cursusForm = <any>{};
	mode: string;
	toetsMatrijsEdit: number;
	toetsMatrijsAdd: Array<any>;
	beroepstakenTypes = <any>{};
	professionalskillsTypes = <any>{};
	beroepstakenForm = <any>{};
	beoordelingselementForm = <any>{};
	toetsMatrijsEditForm = <any>{};
	toetsMatrijsAddForm = <any>{};
	toetsEdit = <any>{};
	toetsForm = <any>{};
	leerdoelForm = <any>{};
	professionalskillForm = <any>{};

	constructor(private cursusService: CursussenService, private docentenService: DocentenService, private beroepstaakService: BeroepstakenService, private professionalskillService: ProfessionalskillsService, private leerdoelenService: LeerdoelenService, private toetsenService: ToetsenService, private toetsmatrijzenService: ToetsmatrijzenService, private bloomniveauService: BloomniveausService) {
		this.loading = true;
	}

	ngOnInit(): void {
		this.cursusForm = {};
		this.mode = 'view';
		this.toetsMatrijsEdit = 0;
		this.toetsMatrijsAdd = [];
		this.cursusService.getCursussen().subscribe(cursussen => {
			this.courses = cursussen;
			this.currentCourse = this.courses[0];
			this.cursusForm = this.courses[0];
			this.refreshAll();
		},
		error => console.log('Error: ', error),
		() => {
			this.loading = false;
			// console.log(this.currentCourse);
		});
	}


	changeMode(mode) {
		this.refreshDocenten();
		this.mode = mode;
	}

	deleteBeroepstaak(bt: Object) {
		this.cursusService.deleteBeroepstaak(this.currentCourse.id, bt['id']).subscribe(
				result => { this.refreshBeroepstaken(); this.generateToetsMatrijs();  },
				error => { this.refreshBeroepstaken();  this.generateToetsMatrijs(); });
	}

	deleteProfessionalskill(ps: Object) {
		this.cursusService.deleteProfessionalskill(this.currentCourse.id, ps['id']).subscribe(
				result => { this.refreshProfessionalskills(); },
				error => { this.refreshProfessionalskills(); });
	}


	deleteBeoordelingsElement(el) {
		this.toetsenService.deleteBeoordelingselement(el['id']).subscribe(
				result => { this.refreshToetsen(); this.generateToetsMatrijs() },
				error => { this.refreshToetsen(); this.generateToetsMatrijs();});
	}

	getBeroepstaakTypes() {
		this.loading = true;
		this.beroepstaakService.getBeroepstaakTypes().subscribe(result => {
			this.beroepstakenTypes = result;
			this.beroepstakenForm = {architectuurlaag: 1, activiteit: 1, niveau: 1};
			this.loading = false;
		});
	}

	getAllBeroepstaken() {
		this.loading = true;
		this.beroepstaakService.getBeroepstaken().subscribe(result => {
			this.allBeroepstaken = result;
			for(let i = 0; i < this.currentCourse.beroepstaken.length; i++) {
				this.allBeroepstaken = this.allBeroepstaken.filter((x) => x.id !== this.currentCourse.beroepstaken[i].id);
			}
			this.loading = false;
		});
	}

// ******************
// Leerdoel operaties
// ******************
	
	refreshLeerdoelen() {
		this.loading = true;
		this.leerdoelenService.getLeerdoelenByObject(this.currentCourse.leerdoelen).subscribe(leerdoelen => {
			this.currentCourse.leerdoelenlijst = leerdoelen;
			this.loading = false;
		});
	}

	initializeLeerdoelForm() {
		this.loading = true;
		this.leerdoelForm = {};
		this.bloomniveauService.getBloomniveaus().subscribe(data => {
			this.allBloomniveaus = data;
			let selectedBeroepstaak = 0;
			if (this.currentCourse.beroepstaken.length > 0)
				selectedBeroepstaak = this.currentCourse.beroepstaken[0].id;

			let selectedProfessionalSkill = 0;
			if (this.currentCourse.professionalskills.length > 0)
				selectedProfessionalSkill = this.currentCourse.professionalskills[0].id;

			this.leerdoelForm = {
					eindBT: selectedBeroepstaak,
					eindPS: selectedProfessionalSkill,
					bloomniveau: data[0].id,
					gewicht: 0.0,
					omschrijving: ""
			};
			this.loading = false;
		});
	}

    initializeLeerdoelModal(leerdoel) {
		console.log(leerdoel);
    	this.leerdoelModal.show();
		this.loading = true;
		if (this.allBloomniveaus == null) {
			this.bloomniveauService.getBloomniveaus().subscribe(bloomniveaus => {
				this.allBloomniveaus = bloomniveaus;
			});
		};
		this.leerdoelForm = {
				id : leerdoel.id,
				eindBT: leerdoel.eindBT.id,
				eindPS: leerdoel.eindPS.id,
				bloomniveau: leerdoel.bloomniveau.id,
				gewicht: leerdoel.gewicht,
				omschrijving: leerdoel.omschrijving
		};
		console.log("leerdoelForm");
		console.log(this.leerdoelForm);
		this.loading = false
    }

	saveLeerdoel() {
		this.loading = true;
		this.cursusService.saveLeerdoel(this.currentCourse.id, this.leerdoelForm).subscribe(x => {
			this.refreshLeerdoelen();
			this.closeModal(this.leerdoelModal);
		});
	}

	deleteLeerdoel(ld: Object) {
		this.cursusService.deleteLeerdoel(ld['id']).subscribe(
				result => { this.refreshLeerdoelen(); this.generateToetsMatrijs(); },
				error => { this.refreshLeerdoelen(); this.generateToetsMatrijs(); });
	}


// ******************
// Toets operaties
// ******************

	refreshToetsen() {
		this.loading = true;
		this.toetsenService.getToetsenByObject(this.currentCourse.toetsen).subscribe(toetsen => {
			this.currentCourse.toetsenlijst = toetsen;
			this.loading = false;
		});
	}

	initializeToetsForm() {
		this.loading = true;
		this.toetsForm = {};
		this.toetsenService.getOsisrisResultaatTypes().subscribe(data => {
			this.toetsForm.osirisResultaatType = data[0].id;
			this.allOsirisResultaatTypen = data;
			this.loading = false;
		});
	}

    initializeToetsModal(toets) {
		console.log(toets);
    	this.toetsModal.show();
		this.loading = true;
		this.toetsenService.getOsisrisResultaatTypes().subscribe(data => {
			this.allOsirisResultaatTypen = data;
			this.toetsForm = {
					naam : toets.naam,
					id : toets.id,
					gewicht : toets.gewicht,
					osirisResultaatType : toets.osirisResultaatType.id
			};
			this.loading = false
		});
     }

	saveToets() {
		this.loading = true;
		console.log(this.toetsForm);
		this.cursusService.saveToets(this.currentCourse.id, this.toetsForm).subscribe(x => {
			this.refreshToetsen();
			this.closeModal(this.toetsModal);
		});
	}

	deleteToets(to: Object) {
		this.cursusService.deleteToets(to['id']).subscribe(
				result => { this.refreshToetsen(); this.generateToetsMatrijs(); },
				error => { this.refreshToetsen(); this.generateToetsMatrijs(); });
	}


	initializeCursusForm() {
		this.loading = true;
		this.cursusForm = {};
		this.docentenService.getDocenten().subscribe(data => {
			this.allDocenten = data;
			let selectedDocent = 0;
			if(data.length > 0)
				selectedDocent = data[0].id;
			this.cursusForm = {coordinator: selectedDocent};
			this.loading = false;
		});
	}


	addCursus() {
		this.loading = true;
		console.log(this.cursusForm);
		this.cursusService.addCursus(this.cursusForm).subscribe(x => {
			this.refreshCursussen();
			this.closeModal(this.cursusModal);
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

	initializeBeoordelingsForm(toets) {
		this.loading = true;
		this.toetsEdit = toets;
		this.beoordelingselementForm = {};
		this.loading = false;
	}

	getAllProfessionalskills() {
		this.loading = true;
		this.professionalskillService.getProfessionalskills().subscribe(result => {
			this.allProfessionalskills = result;
			for (let i = 0; i < this.currentCourse.professionalskills.length; i++) {
				this.allProfessionalskills = this.allProfessionalskills.filter((x) => x.id !== this.currentCourse.professionalskills[i].id);
			}
			this.loading = false;
		});
	}

	addBeroepstaak() {
		this.loading = true;
		this.beroepstaakService.getBeroepstaakId(this.beroepstakenForm.activiteit, this.beroepstakenForm.architectuurlaag, this.beroepstakenForm.niveau).subscribe(data => {
			this.cursusService.addBeroepstakenToCursus(this.currentCourse.id, data).subscribe(x => {
				this.beroepstaakModal.hide();
				this.refreshBeroepstaken();
				this.generateToetsMatrijs();
				this.loading = false;
			});
		});
	}

	addProfessionalskill() {
		this.loading = true;
		this.professionalskillService.getProfessionalskillId(this.professionalskillForm.activiteit, this.professionalskillForm.niveau).subscribe(data => {
			this.cursusService.addProfessionalskillToCursus(this.currentCourse.id, data).subscribe(x => {
				this.professionalskillModal.hide();
				this.refreshProfessionalskills();
				this.loading = false;
			});
		});
	}


	addProfessionalskills() {
		let selected = this.allProfessionalskills.filter((x) => x.selected)
		this.error = false;

		if(selected.length == 0)
			this.error = true;

		if(!this.error) {
			for(let i = 0; i < selected.length; i++) {
				this.cursusService.addProfessionalskillToCursus(this.currentCourse.id, selected[i]).subscribe(x => {
					this.professionalskillModal.hide();
					this.refreshProfessionalskills();
				});
			}
		}
	}

	addBeoordelingselementToToets(element) {
		this.loading = true;
		this.toetsenService.addBeoordelingsElementToToets(this.toetsEdit.id, this.beoordelingselementForm).subscribe(data => {
			this.refreshToetsen();
			this.generateToetsMatrijs();
			this.beoordelingselementModal.hide();
			this.loading = false;
		});
	}

	checkbox(item) {
		item.selected = (item.selected) ? false : true;
	}

	onSelect(cursus: Object) {
		this.onSelectedCourse.emit(cursus);
		this.currentCourse = cursus;
		this.cursusForm = cursus;

		this.refreshAll();

		console.log(this.currentCourse);
	}


	save(form: any) {
		var formValues = form.value;
		this.cursusService.updateCursus(this.currentCourse.id, formValues).subscribe(
				data => {
					this.mode = 'view';
					this.cursusService.getCursussenByObject(this.currentCourse).subscribe(cursus => {
						this.currentCourse = cursus;
						this.cursusForm = cursus;
						this.currentCourse.beroepstaken = [];
						this.currentCourse.professionalskills = [];
						this.currentCourse.toetsenlijst = [];
						this.currentCourse.toetsmatrijs = [];
						this.refreshAll();
					});
					this.refreshCursussen();
				}
		);
	}

	generateToetsMatrijs() {
		this.loading = true;
		this.toetsmatrijzenService.getToetsmatrijzenById(this.currentCourse.id).subscribe(toetsmatrijs => {

			console.log(toetsmatrijs);

			var totalCells = 5; // De eerste 4 cells gereserveerd voor benaming
								// van
			// leerdoelen
			var totalRows = toetsmatrijs.leerdoelen.length+3; // +2 voor de
																// benaming
			// van toetsen

			for (let i = 0; i < toetsmatrijs.toetsen.length; i++) {
				totalCells += toetsmatrijs.toetsen[i].beoordelingsElementen.length;
			}


			console.log("Total rows:" + totalRows);

			console.log("Total cells:" + totalCells);

			let toetsmatrijsArray = Array.apply(null, Array(totalRows)); // Rows
			// aanmaken

			for(let i = 0; i < toetsmatrijsArray.length; i++) {
				toetsmatrijsArray[i] = Array.apply(null, Array(totalCells)); // Cellen
				// aanmaken
			}

			var toetsPosition = 5;
			for(let i = 0; i < toetsmatrijs.toetsen.length; i++) {
				toetsmatrijsArray[0][toetsPosition] = toetsmatrijs.toetsen[i].naam;


				for(let j = 0; j < toetsmatrijs.toetsen[i].beoordelingsElementen.length; j++) {
					toetsmatrijsArray[1][toetsPosition+j] = toetsmatrijs.toetsen[i].beoordelingsElementen[j];
					this.cursusService.getToetsElementen(toetsPosition+j,toetsmatrijs.toetsen[i].beoordelingsElementen[j].href+'/toetselementen').subscribe(data => {
						var gewicht = 0;
						// console.log(data[1]);
						// console.log(data[0]);
						for(let o = 0; o < data[1].length; o++) {
							gewicht += data[1][o].gewicht;
						}
						// console.log(gewicht);
						toetsmatrijsArray[2][data[0]] = gewicht;
					});

				}
				let addPosition = 1;
				if(toetsmatrijs.toetsen[i].beoordelingsElementen.length > 0)
					addPosition = toetsmatrijs.toetsen[i].beoordelingsElementen.length;
				toetsPosition += addPosition;
				this.loading = false;
			}


			for(let i = 0; i < toetsmatrijs.leerdoelen.length; i++) {
				toetsmatrijsArray[3 + i][0] = toetsmatrijs.leerdoelen[i].eindPS.naam;
				toetsmatrijsArray[3 + i][1] = toetsmatrijs.leerdoelen[i].eindBT.naam;
				toetsmatrijsArray[3 + i][2] = "LD-" + toetsmatrijs.leerdoelen[i].id;
				toetsmatrijsArray[3 + i][3] = toetsmatrijs.leerdoelen[i].bloomniveau.naam;
				var totalGewicht = 0;
				for (let p = 0; p < toetsmatrijs.leerdoelen[i].toetsElementen.length; p++) {
					var idToetsElement = toetsmatrijs.leerdoelen[i].toetsElementen[p].beoordelingsElement.id;
					totalGewicht += toetsmatrijs.leerdoelen[i].toetsElementen[p].gewicht;
					for (let j = 0; j < toetsmatrijsArray[1].length; j++) {
						if (j > 4) {
							if (idToetsElement == toetsmatrijsArray[1][j].id) {
								toetsmatrijsArray[3 + i][j] = toetsmatrijs.leerdoelen[i].toetsElementen[p];
							}
						}
					}
					toetsmatrijsArray[3 + i][4] = totalGewicht;
				}

				for (let j = 0; j < toetsmatrijsArray[1].length; j++) {
					if(j > 4) {
						if(!(toetsmatrijsArray[3 + i][j] instanceof Object)) {
							toetsmatrijsArray[3 + i][j] = [toetsmatrijs.leerdoelen[i].id, toetsmatrijsArray[1][j].id];
						}
					}

				}
			}

			this.currentCourse.toetsmatrijs = toetsmatrijsArray;
		});

	}

	editCell(id, gewicht) {
		if(id != null)
			this.toetsMatrijsAdd = [];
		this.toetsMatrijsEdit = id;
		this.toetsMatrijsEditForm.gewicht = gewicht;
	}

	addCell(item) {
		if(item != null)
			this.toetsMatrijsAddForm = {};
		this.toetsMatrijsEdit = 0;
		this.toetsMatrijsAdd = item;

	}

	editToetsElement() {
		this.loading = true;
		console.log(this.toetsMatrijsAdd);
		console.log(this.toetsMatrijsAddForm);
		this.cursusService.editToetsElement(this.toetsMatrijsEdit, this.toetsMatrijsEditForm).subscribe(x => {
			this.generateToetsMatrijs();
			this.toetsMatrijsEdit = 0;
			this.loading = false;
		});
	}

	addToetsElement() {
		this.loading = true;
		this.toetsMatrijsAddForm.beoordelingsElement = this.toetsMatrijsAdd[1];
		console.log(this.toetsMatrijsAdd);
		console.log(this.toetsMatrijsAddForm);
		this.cursusService.addToetsElement(this.toetsMatrijsAdd[0], this.toetsMatrijsAddForm).subscribe(x => {
			this.generateToetsMatrijs();
			this.toetsMatrijsAdd = [];
			this.loading = false;
		});
	}

	deleteToetsElement() {
		this.loading = true;
		this.cursusService.deleteToetsElement(this.toetsMatrijsEdit).subscribe(x =>{
			this.generateToetsMatrijs();
			this.toetsMatrijsEdit = 0;
			this.loading = false;
		});
	}

	cancelEditGewicht() {
		this.toetsMatrijsEdit = 0;
	}

	cancelSaveGewicht() {
		this.toetsMatrijsAdd = [];
	}

	refreshBeroepstaken() {
		this.loading = true;
		this.beroepstaakService.getBeroepstakenByObject(this.currentCourse.eindBT).subscribe(beroepstaken => {
			this.currentCourse.beroepstaken = beroepstaken;
			this.loading = false;
		});
	}

	refreshProfessionalskills() {
		this.loading = true;
		this.professionalskillService.getProfessionalskillsByObject(this.currentCourse.eindPS).subscribe(professionalskills => {
			this.currentCourse.professionalskills = professionalskills;
			this.loading = false;
		});
	}

	refreshDocenten() {
		this.loading = true;
		this.docentenService.getDocenten().subscribe(docenten => {
			this.allDocenten = docenten;
			this.loading = false;
		});
	}

	refreshAll() {
		this.refreshBeroepstaken();
		this.refreshProfessionalskills();
		this.refreshLeerdoelen();
		this.refreshToetsen();
		this.generateToetsMatrijs();

		console.log(this.currentCourse);
	}

	private refreshCursussen() {
		this.loading = true;
		this.cursusService.getCursussen().subscribe(cursussen => {
			this.courses = cursussen;
// this.currentCourse.beroepstaken = [];
// this.currentCourse.professionalskills = [];
// this.currentCourse.toetsenlijst = [];
// this.currentCourse.toetsmatrijs = [];

// this.refreshAll();
			this.loading = false;
		},
		error => console.log('Error: ', error),
		() => {
			this.loading = false;
			console.log(this.currentCourse);
		});
	}
	
	closeModal(modal) {
		this.loading = false;
		modal.hide()
	}
}
