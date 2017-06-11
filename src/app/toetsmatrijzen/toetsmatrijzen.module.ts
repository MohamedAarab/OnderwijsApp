import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { DropdownModule } from 'ng2-bootstrap/dropdown';


import { ToetsmatrijzenService } from './toetsmatrijzen.service';
import { ToetsmatrijzenRoutingModule } from './toetsmatrijzen-routing.module';
import { ToetsmatrijzenComponent } from './toetsmatrijzen.component';
import {CommonModule} from '@angular/common';
import {HttpModule} from '@angular/http';

@NgModule({
  imports: [
    ToetsmatrijzenRoutingModule,
    ChartsModule,
    HttpModule,
    DropdownModule,
    CommonModule
  ],
  declarations: [ ToetsmatrijzenComponent ],
  providers: [ToetsmatrijzenService]
})
export class ToetsmatrijzenModule { }
