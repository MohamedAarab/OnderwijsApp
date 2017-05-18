import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { DropdownModule } from 'ng2-bootstrap/dropdown';

import { OpleidingsprofielenComponent } from './opleidingsprofielen.component';
import { OpleidingsprofielenService } from './opleidingsprofielen.service';
import { OpleidingsprofielenRoutingModule } from './opleidingsprofielen-routing.module';
import {CommonModule} from "@angular/common";
import {HttpModule} from "@angular/http";

@NgModule({
  imports: [
    OpleidingsprofielenRoutingModule,
    ChartsModule,
    HttpModule,
    DropdownModule,
    CommonModule
  ],
  declarations: [ OpleidingsprofielenComponent ],
  providers: [OpleidingsprofielenService]
})
export class OpleidingsprofielenModule { }
