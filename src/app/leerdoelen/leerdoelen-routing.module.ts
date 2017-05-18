import { NgModule } from '@angular/core';
import { Routes,
     RouterModule } from '@angular/router';

import { LeerdoelenComponent } from './leerdoelen.component';

const routes: Routes = [
  {
    path: '',
    component: LeerdoelenComponent,
    data: {
      title: 'Leerdoelen'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeerdoelenRoutingModule {}
