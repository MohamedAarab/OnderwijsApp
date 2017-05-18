import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { DropdownModule } from 'ng2-bootstrap/dropdown';

import { CursussenComponent } from './cursussen.component';
import { CursussenService } from './cursussen.service';
import { CursussenRoutingModule } from './cursussen-routing.module';
import {CommonModule} from '@angular/common';
import { TablesComponent } from '../components/tables.component';

// Modal Component
import { ModalModule } from 'ng2-bootstrap/modal';
import { ModalsComponent } from '../components/modals.component';

// Tabs Component
import { TabsModule } from 'ng2-bootstrap/tabs';
import { TabsComponent } from '../components/tabs.component';

import {HttpModule} from '@angular/http';
import {BeroepstakenService} from '../beroepstaken/beroepstaken.service';
import {ProfessionalskillsService} from '../professionalskills/professionalskills.service';
import {LeerdoelenService} from '../leerdoelen/leerdoelen.service';

@NgModule({
  imports: [
    CursussenRoutingModule,
    ChartsModule,
    HttpModule,
    DropdownModule,
    CommonModule,
    TabsModule,
    ModalModule.forRoot()
  ],
  declarations: [ CursussenComponent,
    TabsComponent, TablesComponent, ModalsComponent],
  providers: [CursussenService, BeroepstakenService, ProfessionalskillsService, LeerdoelenService]
})
export class CursussenModule { }
