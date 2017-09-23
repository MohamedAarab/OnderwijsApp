import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { DropdownModule } from 'ng2-bootstrap/dropdown';

import { CursussenComponent } from './cursussen.component';
import { CursussenService } from './cursussen.service';
import { CursussenRoutingModule } from './cursussen-routing.module';
import { CommonModule } from '@angular/common';
import { TablesComponent } from '../components/tables.component';

// Modal Component
import { ModalModule } from 'ng2-bootstrap/modal';
import { ModalsComponent } from '../components/modals.component';

// Tabs Component
import { TabsModule } from 'ng2-bootstrap/tabs';
import { TabsComponent } from '../components/tabs.component';

import {TooltipModule} from 'ng2-bootstrap';
import {Tooltip} from "ngx-tooltip";

import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {BeroepstakenService} from '../services/beroepstaken.service';
import {ProfessionalskillsService} from '../services/professionalskills.service';
import {LeerdoelenService} from '../services/leerdoelen.service';
import {ToetsenService} from '../services/toetsen.service';
import {ToetsmatrijzenService} from '../services/toetsmatrijzen.service';
import {BloomniveausService} from '../services/bloomniveaus.service';
import {DocentenService} from "../services/docenten.service";
import {BtMatrixModule} from '../bt-overzicht/bt-matrix.module';
import {PsOverzichtModule} from '../ps-overzicht/ps-overzicht.module';

@NgModule({
	imports: [
		BtMatrixModule,
		PsOverzichtModule,
		CursussenRoutingModule,
		ChartsModule,
		HttpModule,
		DropdownModule,
		FormsModule,
		CommonModule,
		TabsModule,
		ModalModule.forRoot()
		],
	declarations: [ 
		CursussenComponent,
//		TabsComponent, 
//		TablesComponent, 
//		ModalsComponent
	],
	providers: [
		CursussenService, 
		DocentenService, 
		BeroepstakenService, 
		ProfessionalskillsService, 
		LeerdoelenService, 
		ToetsenService, 
		ToetsmatrijzenService, 
		BloomniveausService
	]
})
export class CursussenModule { }
