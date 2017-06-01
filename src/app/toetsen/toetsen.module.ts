import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { DropdownModule } from 'ng2-bootstrap/dropdown';


import { ToetsenService } from './toetsen.service';
import { ToetsenRoutingModule } from './toetsen-routing.module';
import { ToetsenComponent } from './toetsen.component';
import {CommonModule} from '@angular/common';
import {HttpModule} from '@angular/http';

@NgModule({
  imports: [
    ToetsenRoutingModule,
    ChartsModule,
    HttpModule,
    DropdownModule,
    CommonModule
  ],
  declarations: [ ToetsenComponent ],
  providers: [ToetsenService]
})
export class ToetsenModule { }
