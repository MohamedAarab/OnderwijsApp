import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { DropdownModule } from 'ng2-bootstrap/dropdown';

import { CursussenComponent } from './cursussen.component';
import { CursussenService } from './cursussen.service';
import { CursussenRoutingModule } from './cursussen-routing.module';
import {CommonModule} from "@angular/common";
import {HttpModule} from "@angular/http";

@NgModule({
  imports: [
    CursussenRoutingModule,
    ChartsModule,
    HttpModule,
    DropdownModule,
    CommonModule
  ],
  declarations: [ CursussenComponent ],
  providers: [CursussenService]
})
export class CursussenModule { }
