import { NgModule } from '@angular/core';
import { Routes,
     RouterModule } from '@angular/router';

import { ToetsmatrijzenComponent } from './toetsmatrijzen.component';

const routes: Routes = [
  {
    path: '',
    component: ToetsmatrijzenComponent,
    data: {
      title: 'Toetsmatrijzen'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ToetsmatrijzenRoutingModule {}
