import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { DropdownModule } from 'ng2-bootstrap/dropdown';


import { OrganisatiesService } from './organisaties.service';
import { OrganisatiesRoutingModule } from './organisaties-routing.module';
import { OrganisatiesComponent } from './organisaties.component';
import {CommonModule} from '@angular/common';
import {HttpModule} from '@angular/http';

@NgModule({
  imports: [
    OrganisatiesRoutingModule,
    ChartsModule,
    HttpModule,
    DropdownModule,
    CommonModule
  ],
  declarations: [ OrganisatiesComponent ],
  providers: [OrganisatiesService]
})
export class OrganisatiesModule { }
