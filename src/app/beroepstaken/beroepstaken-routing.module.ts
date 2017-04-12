import { NgModule } from '@angular/core';
import { Routes,
     RouterModule } from '@angular/router';

import { BeroepstakenComponent } from './beroepstaken.component';

const routes: Routes = [
  {
    path: '',
    component: BeroepstakenComponent,
    data: {
      title: 'Beroepstaken'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BeroepstakenRoutingModule {}
