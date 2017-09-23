import { NgModule } from '@angular/core';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { DropdownModule } from 'ng2-bootstrap/dropdown';

import { CommonModule } from '@angular/common';
import { TablesComponent } from '../components/tables.component';
import {FormsModule} from '@angular/forms';

import {TooltipModule} from 'ng2-bootstrap';
import {Tooltip} from "ngx-tooltip";

// Modal Component
import { ModalModule } from 'ng2-bootstrap/modal';
import { ModalsComponent } from '../components/modals.component';

// Tabs Component
import { TabsModule } from 'ng2-bootstrap/tabs';
import { TabsComponent } from '../components/tabs.component';

import { HttpModule } from '@angular/http';

import { BeroepstakenService } from '../services/beroepstaken.service';
//import { BeroepstakenComponent } from '../beroepstaken/beroepstaken.component';
import { ProfessionalskillsService } from '../services/professionalskills.service';
import { CursussenService } from '../cursussen/cursussen.service';
import { OpleidingenComponent } from './opleidingen.component';
import { OpleidingenService } from './opleidingen.service';
import { CohortenService } from '../services/cohorten.service';
import { OpleidingenRoutingModule } from './opleidingen-routing.module';
import { LeerplannenService } from '../services/leerplannen.service';
import { BtMatrixModule } from '../bt-overzicht/bt-matrix.module';
import { PsOverzichtModule } from '../ps-overzicht/ps-overzicht.module';

@NgModule({
	imports: [
		PsOverzichtModule,
		BtMatrixModule,
		OpleidingenRoutingModule,
	    ChartsModule,
	    HttpModule,
	    DropdownModule,
	    FormsModule,
	    CommonModule,
	    TabsModule,
	    Ng2OrderModule,
	    TooltipModule.forRoot(),
	    ModalModule.forRoot()
	],
	declarations: [
		OpleidingenComponent
	],
	providers: [ 
		LeerplannenService, 
		OpleidingenService, 
		CohortenService, 
		CursussenService, 
		BeroepstakenService, 
		ProfessionalskillsService 
	]
})

export class OpleidingenModule { }
