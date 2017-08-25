import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { DropdownModule } from 'ng2-bootstrap/dropdown';


import { CohortenService } from '../services/cohorten.service';
import { CohortenRoutingModule } from './cohorten-routing.module';
import { CohortenComponent } from './cohorten.component';
import {CommonModule} from '@angular/common';
import {HttpModule} from '@angular/http';

@NgModule({
  imports: [
    CohortenRoutingModule,
    ChartsModule,
    HttpModule,
    DropdownModule,
    CommonModule
  ],
  declarations: [ CohortenComponent ],
  providers: [CohortenService]
})
export class CohortenModule { }
