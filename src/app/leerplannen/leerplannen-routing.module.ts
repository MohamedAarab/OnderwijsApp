import { NgModule } from '@angular/core';
import { Routes,
     RouterModule } from '@angular/router';

import { LeerplannenComponent } from './leerplannen.component';

const routes: Routes = [
  {
    path: '',
    component: LeerplannenComponent,
    data: {
      title: 'Leerplannen'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeerplannenRoutingModule {}
