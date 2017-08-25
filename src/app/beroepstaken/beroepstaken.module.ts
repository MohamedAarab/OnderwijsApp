import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { DropdownModule } from 'ng2-bootstrap/dropdown';
//Modal Component
import { ModalModule } from 'ng2-bootstrap/modal';
import { ModalsComponent } from '../components/modals.component';


import { BeroepstakenService } from './beroepstaken.service';
import { BeroepstakenRoutingModule } from './beroepstaken-routing.module';
import { BeroepstakenComponent } from './beroepstaken.component';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';

@NgModule({
  imports: [
    BeroepstakenRoutingModule,
    ChartsModule,
    HttpModule,
    DropdownModule,
    CommonModule,
    ModalModule.forRoot()
  ],
  declarations: [ BeroepstakenComponent, ModalsComponent ],
  providers: [BeroepstakenComponent]
})
export class BeroepstakenModule { }
