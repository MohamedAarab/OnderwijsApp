import { NgModule } from '@angular/core';
import { Routes,
     RouterModule } from '@angular/router';

import { ToetsenComponent } from './toetsen.component';

const routes: Routes = [
  {
    path: '',
    component: ToetsenComponent,
    data: {
      title: 'Leerdoelen'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ToetsenRoutingModule {}
