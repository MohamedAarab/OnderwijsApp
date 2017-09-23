import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { DropdownModule } from 'ng2-bootstrap/dropdown';

import { DocentenService } from '../services/docenten.service';
import { DocentenRoutingModule } from './docenten-routing.module';
import { DocentenComponent } from './docenten.component';
import { OrganisatiesService } from '../organisaties/organisaties.service';
import { CursussenService } from '../cursussen/cursussen.service';
import { CommonModule} from '@angular/common';
import { HttpModule} from '@angular/http';
import { Ng2OrderModule } from 'ng2-order-pipe';

// Modal Component
import { ModalModule } from 'ng2-bootstrap/modal';
import { ModalsComponent } from '../components/modals.component';

import {FormsModule} from '@angular/forms';
import { DocentComponent } from '../test/docent.component';

@NgModule({
  imports: [
    DocentenRoutingModule,
    FormsModule,
    ChartsModule,
    HttpModule,
    DropdownModule,
    CommonModule,
    Ng2OrderModule,
    ModalModule.forRoot()
  ],
  declarations: [ DocentenComponent,
    DocentComponent ],
  providers: [ DocentenService, OrganisatiesService, CursussenService ]
})
export class DocentenModule { }
