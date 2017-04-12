import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { DropdownModule } from 'ng2-bootstrap/dropdown';


import { ProfessionalskillsService } from './professionalskills.service';
import { ProfessionalskillsRoutingModule } from './professionalskills-routing.module';
import { ProfessionalskillsComponent } from './professionalskills.component';
import {CommonModule} from '@angular/common';
import {HttpModule} from '@angular/http';

@NgModule({
  imports: [
    ProfessionalskillsRoutingModule,
    ChartsModule,
    HttpModule,
    DropdownModule,
    CommonModule
  ],
  declarations: [ ProfessionalskillsComponent ],
  providers: [ProfessionalskillsComponent]
})
export class ProfessionalskillsModule { }
