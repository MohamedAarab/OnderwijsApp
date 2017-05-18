import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { DropdownModule } from 'ng2-bootstrap/dropdown';

import { LeerplannenComponent } from './leerplannen.component';
import { LeerplannenService } from './leerplannen.service';
import { CohortenService } from '../cohorten/cohorten.service';
import { OrganisatiesService } from '../organisaties/organisaties.service';
import { CursussenService } from '../cursussen/cursussen.service';
import { OpleidingsprofielenService } from '../opleidingsprofielen/opleidingsprofielen.service';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { BeroepstakenService } from '../beroepstaken/beroepstaken.service';
import { LeerplannenRoutingModule } from './leerplannen-routing.module';
import {CommonModule} from '@angular/common';
import {HttpModule} from '@angular/http';
import {ProfessionalskillsService} from '../professionalskills/professionalskills.service';
import {TooltipModule} from 'ng2-bootstrap';
import {Tooltip} from "ngx-tooltip";


@NgModule({
  imports: [
    LeerplannenRoutingModule,
    TooltipModule.forRoot(),
    ChartsModule,
    HttpModule,
    DropdownModule,
    CommonModule,
    Ng2OrderModule
  ],
  declarations: [ LeerplannenComponent],
  providers: [LeerplannenService, CohortenService, OrganisatiesService, CursussenService, OpleidingsprofielenService, BeroepstakenService, ProfessionalskillsService, Tooltip]
})
export class LeerplannenModule { }
