import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { DropdownModule } from 'ng2-bootstrap/dropdown';


import { LeerdoelenService } from './leerdoelen.service';
import { LeerdoelenRoutingModule } from './leerdoelen-routing.module';
import { LeerdoelenComponent } from './leerdoelen.component';
import {CommonModule} from '@angular/common';
import {HttpModule} from '@angular/http';

@NgModule({
  imports: [
    LeerdoelenRoutingModule,
    ChartsModule,
    HttpModule,
    DropdownModule,
    CommonModule
  ],
  declarations: [ LeerdoelenComponent ],
  providers: [LeerdoelenService]
})
export class LeerdoelenModule { }
