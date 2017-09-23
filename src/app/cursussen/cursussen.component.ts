import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild, Directive} from '@angular/core';
import {Router} from '@angular/router';
import {CursussenService} from './cursussen.service';
import {BeroepstakenService} from '../services/beroepstaken.service';
import {ProfessionalskillsService} from '../services/professionalskills.service';
import {LeerdoelenService} from '../services/leerdoelen.service';
import {ToetsenService} from '../services/toetsen.service';
import {AbstractControl, NG_VALIDATORS} from '@angular/forms';
import {ToetsmatrijzenService} from "../services/toetsmatrijzen.service";
import {BloomniveausService} from "../services/bloomniveaus.service";
import {DocentenService} from "../services/docenten.service";
import {BtMatrixComponent} from '../bt-overzicht/bt-matrix.component';
import {PsOverzichtComponent} from '../ps-overzicht/ps-overzicht.component';

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
	toetsMatrijsAdd = <any>{};
	toetsMatrijsEditForm = <any>{};
	toetsMatrijsAddForm = <any>{};
	
	totaalGewichtLeerdoelArray: Array<any>;
	totaalGewichtElementArray: Array<any>;
	beoordelingselementArray: Array<any>;
	toetsenArray: Array<any>;
	
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
			this.totaalGewichtLeerdoelArray = Array.apply(null, Array(this.selectedCursus.leerdoelen.length));
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

	// ******************
	// Cursus operaties
	// ******************

	onSelect(cursus: Object) {
		this.onSelectedCourse.emit(cursus);
		this.selectedCursus = cursus;
		this.cursusForm = cursus;
		this.refreshAll();
		console.log("onSelect(this.selectedCursus)");
		console.log(this.selectedCursus);
	}

	private refreshCursussen() {
		this.loading = true;
		this.cursussenService.getCursussen().subscribe(cursussen => {
			this.courses = cursussen;
			this.loading = false;
		},
		error => console.log('Error: ', error),
		() => {
			this.loading = false;
			console.log(this.selectedCursus);
		});
	}


	saveCursus(form: any) {
		this.loading = true;
		var formValues = form.value;
		this.cursussenService.updateCursus(this.selectedCursus.id, formValues).subscribe( data => {
			this.mode = 'view';
			this.cursussenService.getCursussenByObject(this.selectedCursus).subscribe(cursus => {
				this.onSelect(cursus);
				this.loading = false;
				this.cursusModal.hide()
			});
		});
	}

	addCursus() {
		this.loading = true;
		console.log(this.cursusForm);
		this.cursussenService.addCursus(this.cursusForm).subscribe(
			(res:Response) => {
				var contentLocation = res.headers.get("Content-Location");
				console.log("Content-Location: "+contentLocation);
				this.cursussenService.getDataByHref(contentLocation).subscribe(cursus => {
					this.onSelect(cursus);
					this.loading = false;
					this.cursusModal.hide()
				})
			}
		);
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

	// ******************
	// Professionalskill operaties
	// ******************
	deleteProfessionalskill(ps: Object) {
		this.cursussenService.deleteProfessionalskill(this.selectedCursus.id, ps['id']).subscribe(
				result => { this.refreshProfessionalskills(); },
				error => { this.refreshProfessionalskills(); });
	}

	deleteBeoordelingsElement(el) {
		this.toetsenService.deleteBeoordelingselement(el['id']).subscribe(
				result => { this.refreshToetsen(); this.refreshToetsMatrijs() },
				error => { this.refreshToetsen(); this.refreshToetsMatrijs();});
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



// ******************
// Beroepstaak operaties
// ******************

	addBeroepstaak() {
		this.loading = true;
		this.beroepstaakService.getBeroepstaakId(this.beroepstakenForm.activiteit, this.beroepstakenForm.architectuurlaag, this.beroepstakenForm.niveau).subscribe(data => {
			this.cursussenService.addBeroepstakenToCursus(this.selectedCursus.id, data).subscribe(x => {
				this.beroepstaakModal.hide();
				this.refreshBeroepstaken();
				this.loading = false;
			});
		});
	}

	deleteBeroepstaak(bt: Object) {
		this.cursussenService.deleteBeroepstaak(this.selectedCursus.id, bt['id']).subscribe(
				result => { this.refreshBeroepstaken() },
				error => { this.refreshBeroepstaken() });
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
			this.refreshToetsMatrijs();
			this.closeModal(this.leerdoelModal);
		});
	}

	deleteLeerdoel(ld: Object) {
		this.cursussenService.deleteLeerdoel(ld['id']).subscribe(
				result => { this.refreshLeerdoelen(); this.refreshToetsMatrijs(); },
				error => { this.refreshLeerdoelen(); this.refreshToetsMatrijs(); });
	}


// ******************
// Toets operaties
// ******************

	initializeToetsForm() {
		this.toetsForm = {
			osirisResultaatType : 1
		};
	}

	initializeToetsModal(toets) {
		console.log("initializeToetsModal(toets)");
		console.log(toets);
		this.loading = true;
		this.toetsForm = {
			id : toets.id,
			naam : toets.naam,
			gewicht : toets.gewicht,
			osirisResultaatType : 1
		};
		this.toetsModal.show();
		this.loading = false;
	}
	
	saveToets() {
		this.loading = true;
		console.log(this.toetsForm);
		this.cursussenService.saveToets(this.selectedCursus.id, this.toetsForm).subscribe(x => {
			this.refreshToetsen();
			this.refreshToetsMatrijs()
			this.toetsModal.hide();
			this.loading = false;
		});
	}

	deleteToets(to: Object) {
		this.cursussenService.deleteToets(to['id']).subscribe(
				result => { this.refreshToetsen(); this.refreshToetsMatrijs(); },
				error => { this.refreshToetsen(); this.refreshToetsMatrijs(); });
	}

	initializeBeoordelingselementModal(beoordelingselement) {
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

	saveBeoordelingselement(element) {
		this.loading = true;
		console.log(element);
		this.toetsenService.saveBeoordelingsElement(this.toetsEdit.id, element).subscribe(data => {
			this.refreshToetsen();
			this.refreshToetsMatrijs();
			this.beoordelingselementModal.hide();
			this.loading = false;
		});
	}

	checkbox(item) {
		item.selected = (item.selected) ? false : true;
	}

	editCell(id, gewicht) {
		if(id != null)
			this.toetsMatrijsAdd = [];
		this.toetsMatrijsEdit = id;
		this.toetsMatrijsEditForm.gewicht = gewicht;
	}

	addCell(item) {
		if(item != null) {
			this.toetsMatrijsAdd = item;
			console.log("addCell - this.toetsMatrijsAdd");
			console.log(this.toetsMatrijsAdd);
			this.toetsMatrijsAddForm = {};
			this.toetsMatrijsAddForm.beoordelingsElement = item.beoordelingselement;
			console.log("addCell - this.toetsMatrijsAddForm");
			console.log(this.toetsMatrijsAddForm);
		}
		this.toetsMatrijsEdit = 0;

	}

	editToetsElement() {
		this.loading = true;
		console.log(this.toetsMatrijsAdd);
		console.log(this.toetsMatrijsAddForm);
		this.cursussenService.editToetsElement(this.toetsMatrijsEdit, this.toetsMatrijsEditForm).subscribe(x => {
			this.refreshToetsMatrijs();
			this.toetsMatrijsEdit = 0;
			this.loading = false;
		});
	}

	addToetsElement() {
		this.loading = true;
		this.toetsMatrijsAddForm.beoordelingsElement = this.toetsMatrijsAdd.beoordelingselement.id;
		console.log("addToetsElement - this.toetsMatrijsAdd");
		console.log(this.toetsMatrijsAdd);
		console.log("this.toetsMatrijsAddForm");
		console.log(this.toetsMatrijsAddForm);
		this.cursussenService.addToetsElement(this.toetsMatrijsAdd.leerdoel.id, this.toetsMatrijsAddForm).subscribe(x => {
			this.refreshToetsMatrijs();
			this.toetsMatrijsAdd = {};
			this.loading = false;
		});
	}

	deleteToetsElement() {
		this.loading = true;
		this.cursussenService.deleteToetsElement(this.toetsMatrijsEdit).subscribe(x =>{
			this.refreshToetsMatrijs();
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

	refreshDocenten() {
		this.loading = true;
		this.docentenService.getDocenten().subscribe(docenten => {
			this.allDocenten = docenten;
			this.loading = false;
		});
	}

	refreshBeroepstaken() {
		this.loading = true;
		this.beroepstaakService.getBeroepstakenByObject(this.selectedCursus.eindBT).subscribe(beroepstaken => {
			this.selectedCursus.beroepstaken = beroepstaken;
			console.log("selectedCursus.beroepstaken");
			console.log(this.selectedCursus.beroepstaken);
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

	refreshLeerdoelen() {
		this.loading = true;
		this.leerdoelenService.getLeerdoelenByObject(this.selectedCursus.leerdoelen).subscribe(leerdoelen => {
			this.selectedCursus.leerdoelenLijst = leerdoelen;
			this.loading = false;
		});
	}


	refreshToetsen() {
		this.loading = true;
		this.toetsenService.getToetsenByObject(this.selectedCursus.toetsen).subscribe(toetsen => {
			this.selectedCursus.toetsenLijst = toetsen;
			this.loading = false;
		});
	}

	refreshToetsMatrijs() {
		this.loading = true;
		this.toetsmatrijzenService.getToetsmatrijzenById(this.selectedCursus.id).subscribe(toetsmatrijs => {
			var totalCols = 0;
			console.log('refreshToetsMatrijs toetsmatrijs');
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
			this.totaalGewichtElementArray = Array.apply(null, Array(totalCols));
			this.beoordelingselementArray = Array.apply(null, Array(totalCols)); 
			this.toetsenArray = Array.apply(null, Array(totalCols)); 
			var index = 0;
			for (let toets of toetsmatrijs.toetsen) {
				this.toetsenArray[index] = toets.naam;
				for (let element of toets.beoordelingsElementen) {
					this.beoordelingselementArray[index] = element;
					this.totaalGewichtElementArray[index] = 0;
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
				this.totaalGewichtLeerdoelArray[row] = 0;
				for (let col = 0; col < totalCols; col++) {
					var toetsElement = {
						beoordelingselement : this.beoordelingselementArray[col],
						leerdoel : this.selectedCursus.leerdoelenLijst[row],
						id : 0,
						gewicht : 0
					};
					toetsmatrijsGrid[row][col] = toetsElement;
					for (let p = 0; p < toetsmatrijs.leerdoelen[row].toetsElementen.length; p++) {
//						totalGewicht += toetsmatrijs.leerdoelen[row].toetsElementen[p].gewicht;
						var beoordelingsElementId = toetsmatrijs.leerdoelen[row].toetsElementen[p].beoordelingsElement.id;
						if (beoordelingsElementId == this.beoordelingselementArray[col].id) {
							toetsmatrijsGrid[row][col] = toetsmatrijs.leerdoelen[row].toetsElementen[p];
							this.totaalGewichtLeerdoelArray[row] = this.totaalGewichtLeerdoelArray[row] + toetsmatrijs.leerdoelen[row].toetsElementen[p].gewicht;
							this.totaalGewichtElementArray[col] = this.totaalGewichtElementArray[col] + toetsmatrijs.leerdoelen[row].toetsElementen[p].gewicht;
						}
					}
					console.log('toetsmatrijsGrid[row][col]');
					console.log(toetsmatrijsGrid[row][col]);
				}
			}
			this.selectedCursus.toetsmatrijs = toetsmatrijsGrid;
			console.log("this.selectedCursus.toetsmatrijs");
			console.log(this.selectedCursus.toetsmatrijs);
			console.log(this.totaalGewichtLeerdoelArray);
			this.loading = false;
		})
	}
	
	refreshAll() {
		this.refreshBeroepstaken();
		this.refreshProfessionalskills();
		this.refreshLeerdoelen();
		this.refreshToetsen();
		this.refreshToetsMatrijs();
		console.log(this.selectedCursus);
	}
	
	closeModal(modal) {
		this.loading = false;
		modal.hide()
	}
	
	isEmptyObject(obj) {
		return (Object.keys(obj).length === 0);
	}


}
