import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { DropdownModule } from 'ng2-bootstrap/dropdown';

import { OpleidingenComponent } from './opleidingen.component';
import { OpleidingenService } from './opleidingen.service';
import { OpleidingenRoutingModule } from './opleidingen-routing.module';
import {CommonModule} from "@angular/common";
import {HttpModule} from "@angular/http";

@NgModule({
  imports: [
    OpleidingenRoutingModule,
    ChartsModule,
    HttpModule,
    DropdownModule,
    CommonModule
  ],
  declarations: [ OpleidingenComponent ],
  providers: [OpleidingenService]
})
export class OpleidingenModule { }
