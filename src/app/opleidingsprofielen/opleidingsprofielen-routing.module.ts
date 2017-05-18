import { NgModule } from '@angular/core';
import { Routes,
     RouterModule } from '@angular/router';

import { OpleidingsprofielenComponent } from './opleidingsprofielen.component';

const routes: Routes = [
  {
    path: '',
    component: OpleidingsprofielenComponent,
    data: {
      title: 'Opleidingsprofielen'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OpleidingsprofielenRoutingModule {}
