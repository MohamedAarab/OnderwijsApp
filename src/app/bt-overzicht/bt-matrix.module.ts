import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { DropdownModule } from 'ng2-bootstrap/dropdown';

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

import {BtMatrixComponent} from '../bt-overzicht/bt-matrix.component';

@NgModule({
	imports: [
		ChartsModule,
		HttpModule,
		DropdownModule,
		FormsModule,
		CommonModule,
		TabsModule,
		TooltipModule,
		ModalModule.forRoot()
		],
	declarations: [ 
		BtMatrixComponent
	],
	exports: [ 
		BtMatrixComponent 
	],
	providers: [
	]
})
export class BtMatrixModule { }
