import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild, Directive} from '@angular/core';
import {Router} from '@angular/router';
import {CursussenService} from './cursussen.service';
import {BeroepstakenService} from '../beroepstaken/beroepstaken.service';
import {ProfessionalskillsService} from '../professionalskills/professionalskills.service';
import {LeerdoelenService} from '../leerdoelen/leerdoelen.service';
import {ToetsenService} from '../services/toetsen.service';
import {AbstractControl, NG_VALIDATORS} from '@angular/forms';
import {ToetsmatrijzenService} from "../toetsmatrijzen/toetsmatrijzen.service";
import {BloomniveausService} from "../services/bloomniveaus.service";
import {DocentenService} from "../docenten/docenten.service";

@Component({
	templateUrl: 'cursussen.component.html',
})
export class CursussenComponent implements OnInit {
	@ViewChild('BeroepstaakModal') beroepstaakModal: any;
	allBeroepstaken: Array<any>;
	beroepstakenTypes = <any>{};
	beroepstakenForm = <any>{};

	@ViewChild('ProfessionalskillModal') professionalskillModal: any;
	allProfessionalskills: Array<any>;
	professionalskillsTypes = <any>{};
	professionalskillForm = <any>{};

	@ViewChild('LeerdoelModal') leerdoelModal: any;
	@ViewChild('BeoordelingselementModal') beoordelingselementModal: any;
	beoordelingselementForm = <any>{};
	
	@ViewChild('CursusModal') cursusModal: any;
	@ViewChild('ToetsModal') toetsModal: any;
	@Input() courses: Array<any>;
	@Output() onSelectedCourse = new EventEmitter<Object>();
	allDocenten: Array<any>;
	allBloomniveaus: Array<any>;
	allOsirisResultaatTypen: Array<any>;
	loading: boolean;
	naam: string;
	error: boolean;
	selectedCursus = <any>{};
	cursusForm = <any>{};
	mode: string;
	toetsMatrijsEdit: number;
	toetsMatrijsAdd: Array<any>;
	
	beoordelingselementArray: Array<any>;
	toetsenArray: Array<any>;
	
	toetsMatrijsEditForm = <any>{};
	toetsMatrijsAddForm = <any>{};
	toetsEdit = <any>{};
	toetsForm = <any>{};
	leerdoelForm = <any>{};

	constructor(private cursussenService: CursussenService, private docentenService: DocentenService, private beroepstaakService: BeroepstakenService, private professionalskillService: ProfessionalskillsService, private leerdoelenService: LeerdoelenService, private toetsenService: ToetsenService, private toetsmatrijzenService: ToetsmatrijzenService, private bloomniveauService: BloomniveausService) {
		this.loading = true;
	}

	ngOnInit(): void {
		this.cursusForm = {};
		this.mode = 'view';
		this.toetsMatrijsEdit = 0;
		this.toetsMatrijsAdd = [];
		this.cursussenService.getCursussen().subscribe(cursussen => {
			this.courses = cursussen;
			this.selectedCursus = this.courses[0];
			this.cursusForm = this.courses[0];
			this.refreshAll();
		},
		error => console.log('Error: ', error),
		() => {
			this.loading = false;
			// console.log(this.selectedCursus);
		});
	}


	changeMode(mode) {
		this.refreshDocenten();
		this.mode = mode;
	}


	deleteProfessionalskill(ps: Object) {
		this.cursussenService.deleteProfessionalskill(this.selectedCursus.id, ps['id']).subscribe(
				result => { this.refreshProfessionalskills(); },
				error => { this.refreshProfessionalskills(); });
	}

	deleteBeoordelingsElement(el) {
		this.toetsenService.deleteBeoordelingselement(el['id']).subscribe(
				result => { this.refreshToetsen(); this.generateToetsMatrijsNew() },
				error => { this.refreshToetsen(); this.generateToetsMatrijsNew();});
	}

// ******************
// Beroepstaak operaties
// ******************

	addBeroepstaak() {
		this.loading = true;
		this.beroepstaakService.getBeroepstaakId(this.beroepstakenForm.activiteit, this.beroepstakenForm.architectuurlaag, this.beroepstakenForm.niveau).subscribe(data => {
			this.cursussenService.addBeroepstakenToCursus(this.selectedCursus.id, data).subscribe(x => {
				this.beroepstaakModal.hide();
				this.refreshBeroepstaken();
				this.generateToetsMatrijsNew();
				this.loading = false;
			});
		});
	}

	deleteBeroepstaak(bt: Object) {
		this.cursussenService.deleteBeroepstaak(this.selectedCursus.id, bt['id']).subscribe(
				result => { this.refreshBeroepstaken(); this.generateToetsMatrijsNew();  },
				error => { this.refreshBeroepstaken();  this.generateToetsMatrijsNew(); });
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
			for(let i = 0; i < this.selectedCursus.beroepstaken.length; i++) {
				this.allBeroepstaken = this.allBeroepstaken.filter((x) => x.id !== this.selectedCursus.beroepstaken[i].id);
			}
			this.loading = false;
		});
	}

// ******************
// Leerdoel operaties
// ******************

	refreshLeerdoelen() {
		this.loading = true;
		this.leerdoelenService.getLeerdoelenByObject(this.selectedCursus.leerdoelen).subscribe(leerdoelen => {
			this.selectedCursus.leerdoelenlijst = leerdoelen;
			this.loading = false;
		});
	}

	initializeLeerdoelForm() {
		this.loading = true;
		this.leerdoelForm = {};
		this.bloomniveauService.getBloomniveaus().subscribe(data => {
			this.allBloomniveaus = data;
			let selectedBeroepstaak = 0;
			if (this.selectedCursus.beroepstaken.length > 0)
				selectedBeroepstaak = this.selectedCursus.beroepstaken[0].id;

			let selectedProfessionalSkill = 0;
			if (this.selectedCursus.professionalskills.length > 0)
				selectedProfessionalSkill = this.selectedCursus.professionalskills[0].id;

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
		console.log("leerdoel");
		console.log(leerdoel);
		console.log("this.selectedCursus.professionalskills");
		console.log(this.selectedCursus.professionalskills);
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
		this.cursussenService.saveLeerdoel(this.selectedCursus.id, this.leerdoelForm).subscribe(x => {
			this.refreshLeerdoelen();
			this.closeModal(this.leerdoelModal);
		});
	}

	deleteLeerdoel(ld: Object) {
		this.cursussenService.deleteLeerdoel(ld['id']).subscribe(
				result => { this.refreshLeerdoelen(); this.generateToetsMatrijsNew(); },
				error => { this.refreshLeerdoelen(); this.generateToetsMatrijsNew(); });
	}


// ******************
// Toets operaties
// ******************

	refreshToetsen() {
		this.loading = true;
		this.toetsenService.getToetsenByObject(this.selectedCursus.toetsen).subscribe(toetsen => {
			this.selectedCursus.toetsenlijst = toetsen;
			this.loading = false;
		});
	}

	initializeToetsForm() {
		this.loading = true;
		this.toetsForm = {};
		this.toetsenService.getOsisrisResultaatTypes().subscribe(data => {
// this.toetsForm.osirisResultaatType = data[0].id;
			this.allOsirisResultaatTypen = data;
			this.loading = false;
		});
	}

	initializeToetsModal(toets) {
		console.log(toets);
		this.toetsModal.show();
// this.loading = true;
// this.toetsenService.getOsisrisResultaatTypes().subscribe(data => {
// this.allOsirisResultaatTypen = data;
			this.toetsForm = {
					naam : toets.naam,
					id : toets.id,
					gewicht : toets.gewicht,
					osirisResultaatType : 1
			};
			this.loading = false
// });
	}
	
	initializeBeoordelngelementModal(beoordelingselement) {
		console.log(beoordelingselement);
		this.beoordelingselementModal.show();
		this.loading = true;
		this.beoordelingselementForm = {
			naam : beoordelingselement.naam,
			id : beoordelingselement.id,
			gewicht : beoordelingselement.gewicht,
			omschrijving : beoordelingselement.omschrijving
		};
		this.loading = false
	}
	

	saveToets() {
		this.loading = true;
		console.log(this.toetsForm);
		this.cursussenService.saveToets(this.selectedCursus.id, this.toetsForm).subscribe(x => {
			this.refreshToetsen();
			this.closeModal(this.toetsModal);
		});
	}

	deleteToets(to: Object) {
		this.cursussenService.deleteToets(to['id']).subscribe(
				result => { this.refreshToetsen(); this.generateToetsMatrijsNew(); },
				error => { this.refreshToetsen(); this.generateToetsMatrijsNew(); });
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
			for (let i = 0; i < this.selectedCursus.professionalskills.length; i++) {
				this.allProfessionalskills = this.allProfessionalskills.filter((x) => x.id !== this.selectedCursus.professionalskills[i].id);
			}
			this.loading = false;
		});
	}

	addProfessionalskill() {
		this.loading = true;
		this.professionalskillService.getProfessionalskillId(this.professionalskillForm.activiteit, this.professionalskillForm.niveau).subscribe(data => {
			this.cursussenService.addProfessionalskillToCursus(this.selectedCursus.id, data).subscribe(x => {
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
				this.cursussenService.addProfessionalskillToCursus(this.selectedCursus.id, selected[i]).subscribe(x => {
					this.professionalskillModal.hide();
					this.refreshProfessionalskills();
				});
			}
		}
	}

	saveBeoordelingselement(element) {
		this.loading = true;
		console.log(element);
		this.toetsenService.saveBeoordelingsElement(this.toetsEdit.id, element).subscribe(data => {
			this.refreshToetsen();
			this.generateToetsMatrijsNew();
			this.beoordelingselementModal.hide();
			this.loading = false;
		});
	}

	checkbox(item) {
		item.selected = (item.selected) ? false : true;
	}

	onSelect(cursus: Object) {
		this.onSelectedCourse.emit(cursus);
		this.selectedCursus = cursus;
		this.cursusForm = cursus;
		this.refreshAll();
		console.log("onSelect(this.selectedCursus)");
		console.log(this.selectedCursus);
	}


	saveCursus(form: any) {
		this.loading = true;
		var formValues = form.value;
		this.cursussenService.updateCursus(this.selectedCursus.id, formValues).subscribe( data => {
			this.mode = 'view';
			this.cursussenService.getCursussenByObject(this.selectedCursus).subscribe(cursus => {
				this.selectedCursus = cursus;
				this.cursusForm = cursus;
				this.selectedCursus.beroepstaken = [];
				this.selectedCursus.professionalskills = [];
				this.selectedCursus.toetsenlijst = [];
				this.selectedCursus.toetsmatrijs = [];
				this.refreshAll();
			});
			this.refreshCursussen();
		});
	}

	addCursus() {
		this.loading = true;
		console.log(this.cursusForm);
		this.cursussenService.addCursus(this.cursusForm).subscribe(x => {
			this.refreshCursussen();
			this.closeModal(this.cursusModal);
		});
	}

	generateToetsMatrijsNew() {
		this.loading = true;
		this.toetsmatrijzenService.getToetsmatrijzenById(this.selectedCursus.id).subscribe(toetsmatrijs => {
			var totalCols = 0;
			console.log('generateToetsMatrijsNew toetsmatrijs');
			console.log(toetsmatrijs);
			for (let toets of toetsmatrijs.toetsen) {
				if (toets.beoordelingsElementen != null) {
					totalCols += toets.beoordelingsElementen.length;
				}
			}
			var totalRows = 0;
			if (toetsmatrijs.leerdoelen != null) {
				if (toetsmatrijs.leerdoelen.length > 0) {
					totalRows = toetsmatrijs.leerdoelen.length; 
				}
			}
			if (totalRows > 0) {
			this.beoordelingselementArray = Array.apply(null, Array(totalCols)); 
			this.toetsenArray = Array.apply(null, Array(totalCols)); 
			var index = 0;
			for (let toets of toetsmatrijs.toetsen) {
				this.toetsenArray[index] = toets.naam;
				for (let element of toets.beoordelingsElementen) {
					this.beoordelingselementArray[index] = element;
					index++;
				}
			}
			console.log("this.beoordelingselementArray");
			console.log(this.beoordelingselementArray);
			}
			console.log("Total rows:" + totalRows);
			console.log("Total cols:" + totalCols);

			// grid aanmaken
			let toetsmatrijsGrid = Array.apply(null, Array(totalRows)); 
			for(let i = 0; i < toetsmatrijsGrid.length; i++) {
				toetsmatrijsGrid[i] = Array.apply(null, Array(totalCols)); 
			}
				
			for(let row = 0; row < toetsmatrijs.leerdoelen.length; row++) {
				var totalGewicht = 0;
				for (let p = 0; p < toetsmatrijs.leerdoelen[row].toetsElementen.length; p++) {
					var idToetsElement = toetsmatrijs.leerdoelen[row].toetsElementen[p].beoordelingsElement.id;
					console.log('toetsmatrijs.leerdoelen[row].toetsElementen[p]');
					console.log(toetsmatrijs.leerdoelen[row].toetsElementen[p]);
					for (let col = 0; col < totalCols; col++) {
						if (idToetsElement == this.beoordelingselementArray[col].id) {
							toetsmatrijsGrid[row][col] = toetsmatrijs.leerdoelen[row].toetsElementen[p];
						}
					}
				}
			}
			this.selectedCursus.toetsmatrijs = toetsmatrijsGrid;
			this.loading = false;
		})
	}
	
	generateToetsMatrijs() {
		this.loading = true;
		this.generateToetsMatrijsNew();
		this.toetsmatrijzenService.getToetsmatrijzenById(this.selectedCursus.id).subscribe(toetsmatrijs => {

			console.log(toetsmatrijs);

			var totalCols = 5; 
			for (let toets of toetsmatrijs.toetsen) {
				totalCols += toets.beoordelingsElementen.length;
			// De eerste 4 cells gereserveerd voor benaming van leerdoelen
			var totalRows = toetsmatrijs.leerdoelen.length+3; 
			// +3 voor de benaming van toetsen

			}
			let toetsmatrijsArray = Array.apply(null, Array(totalRows)); // Rows
			// aanmaken

			for(let i = 0; i < toetsmatrijsArray.length; i++) {
				toetsmatrijsArray[i] = Array.apply(null, Array(totalCols)); // Cellen
				// aanmaken
			}

			// ==========
			// kopteksten
			// ==========
			var toetsPosition = 5;
			for(let toets of toetsmatrijs.toetsen) {
				toetsmatrijsArray[0][toetsPosition] = toets.naam;


				for(let j = 0; j < toets.beoordelingsElementen.length; j++) {
					toetsmatrijsArray[1][toetsPosition+j] = toets.beoordelingsElementen[j];
					this.cursussenService.getToetsElementen(toetsPosition+j,toets.beoordelingsElementen[j].href+'/toetselementen').subscribe(data => {
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
				if(toets.beoordelingsElementen.length > 0)
					addPosition = toets.beoordelingsElementen.length;
				toetsPosition += addPosition;
				this.loading = false;
			}
			

			for(let i = 0; i < toetsmatrijs.leerdoelen.length; i++) {
				toetsmatrijsArray[3 + i][0] = "LD-" + toetsmatrijs.leerdoelen[i].id;
				toetsmatrijsArray[3 + i][1] = toetsmatrijs.leerdoelen[i].bloomniveau.naam;
				var totalGewicht = 0;
				for (let p = 0; p < toetsmatrijs.leerdoelen[i].toetsElementen.length; p++) {
					var idToetsElement = toetsmatrijs.leerdoelen[i].toetsElementen[p].beoordelingsElement.id;
					totalGewicht += toetsmatrijs.leerdoelen[i].toetsElementen[p].gewicht;
					toetsmatrijsArray[3 + i][2] = totalGewicht;
					console.log('toetsmatrijs.leerdoelen[i].toetsElementen[p]');
					console.log(toetsmatrijs.leerdoelen[i].toetsElementen[p]);
					for (let j = 0; j < toetsmatrijsArray[1].length; j++) {
						if (j > 4) {
							if (idToetsElement == toetsmatrijsArray[1][j].id) {
								toetsmatrijsArray[3 + i][j] = toetsmatrijs.leerdoelen[i].toetsElementen[p];
							}
						}
					}
				}

// for (let j = 0; j < toetsmatrijsArray[1].length; j++) {
// if(j > 4) {
// if(!(toetsmatrijsArray[3 + i][j] instanceof Object)) {
// toetsmatrijsArray[3 + i][j] = [toetsmatrijs.leerdoelen[i].id,
// toetsmatrijsArray[1][j].id];
// }
// }
//
// }
			}

			this.selectedCursus.toetsmatrijs = toetsmatrijsArray;
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
		this.cursussenService.editToetsElement(this.toetsMatrijsEdit, this.toetsMatrijsEditForm).subscribe(x => {
			this.generateToetsMatrijsNew();
			this.toetsMatrijsEdit = 0;
			this.loading = false;
		});
	}

	addToetsElement() {
		this.loading = true;
		this.toetsMatrijsAddForm.beoordelingsElement = this.toetsMatrijsAdd[1];
		console.log(this.toetsMatrijsAdd);
		console.log(this.toetsMatrijsAddForm);
		this.cursussenService.addToetsElement(this.toetsMatrijsAdd[0], this.toetsMatrijsAddForm).subscribe(x => {
			this.generateToetsMatrijsNew();
			this.toetsMatrijsAdd = [];
			this.loading = false;
		});
	}

	deleteToetsElement() {
		this.loading = true;
		this.cursussenService.deleteToetsElement(this.toetsMatrijsEdit).subscribe(x =>{
			this.generateToetsMatrijsNew();
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
		this.beroepstaakService.getBeroepstakenByObject(this.selectedCursus.eindBT).subscribe(beroepstaken => {
			this.selectedCursus.beroepstaken = beroepstaken;
			console.log("selectedCursus.beroepstaken");
			console.log(this.selectedCursus.beroepstaken);
			let btMatrix = this.generateMatrix();
			for (let bt of this.selectedCursus.beroepstaken) {
				btMatrix[bt.architectuurlaagId][bt.activiteitId] = bt;
			}
			this.selectedCursus.btMatrix = btMatrix;
			this.loading = false;
		});
	}

	refreshProfessionalskills() {
		this.loading = true;
		this.professionalskillService.getProfessionalskillsByObject(this.selectedCursus.eindPS).subscribe(professionalskills => {
			this.selectedCursus.professionalskills = professionalskills;
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
		this.generateToetsMatrijsNew();

		console.log(this.selectedCursus);
	}

	private refreshCursussen() {
		this.loading = true;
		this.cursussenService.getCursussen().subscribe(cursussen => {
			this.courses = cursussen;
// this.selectedCursus.beroepstaken = [];
// this.selectedCursus.professionalskills = [];
// this.selectedCursus.toetsenlijst = [];
// this.selectedCursus.toetsmatrijs = [];

// this.refreshAll();
			this.loading = false;
		},
		error => console.log('Error: ', error),
		() => {
			this.loading = false;
			console.log(this.selectedCursus);
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


}
