import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { DropdownModule } from 'ng2-bootstrap/dropdown';


import { BeroepstakenService } from './beroepstaken.service';
import { BeroepstakenRoutingModule } from './beroepstaken-routing.module';
import { BeroepstakenComponent } from './beroepstaken.component';
import {CommonModule} from '@angular/common';
import {HttpModule} from '@angular/http';

@NgModule({
  imports: [
    BeroepstakenRoutingModule,
    ChartsModule,
    HttpModule,
    DropdownModule,
    CommonModule
  ],
  declarations: [ BeroepstakenComponent ],
  providers: [BeroepstakenComponent]
})
export class BeroepstakenModule { }
