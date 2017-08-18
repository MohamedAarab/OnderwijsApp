import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DocentenComponent } from './docenten.component';

const routes: Routes = [
  {
    path: '',
    component: DocentenComponent,
    data: {
      title: 'docenten'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocentenRoutingModule {}
