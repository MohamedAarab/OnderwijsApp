import { NgModule } from '@angular/core';
import { Routes,
     RouterModule } from '@angular/router';

import { CohortenComponent } from './cohorten.component';

const routes: Routes = [
  {
    path: '',
    component: CohortenComponent,
    data: {
      title: 'Cohorten'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CohortenRoutingModule {}
