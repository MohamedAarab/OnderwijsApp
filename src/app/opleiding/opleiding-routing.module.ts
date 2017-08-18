import { NgModule } from '@angular/core';
import { Routes,
     RouterModule } from '@angular/router';

import { OpleidingComponent } from './opleiding.component';

const routes: Routes = [
  {
    path: '',
    component: OpleidingComponent,
    data: {
      title: 'Opleidingsprofielen'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OpleidingRoutingModule {}
