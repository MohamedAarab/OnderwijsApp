import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { DropdownModule } from 'ng2-bootstrap/dropdown';

import { CoordinatorenService } from './coordinatoren.service';
import { CoordinatorenRoutingModule } from './coordinatoren-routing.module';
import { CoordinatorenComponent } from './coordinatoren.component';
import { OrganisatiesService } from '../organisaties/organisaties.service';
import { CursussenService } from '../cursussen/cursussen.service';
import { CommonModule} from '@angular/common';
import { HttpModule} from '@angular/http';

// Modal Component
import { ModalModule } from 'ng2-bootstrap/modal';
import { ModalsComponent } from '../components/modals.component';

import {FormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CoordinatorenRoutingModule,
    FormsModule,
    ChartsModule,
    HttpModule,
    DropdownModule,
    CommonModule,
    ModalModule.forRoot()
  ],
  declarations: [ CoordinatorenComponent ],
  providers: [ CoordinatorenService, OrganisatiesService, CursussenService ]
})
export class CoordinatorenModule { }
