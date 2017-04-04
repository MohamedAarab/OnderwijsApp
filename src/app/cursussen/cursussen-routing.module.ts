import { NgModule } from '@angular/core';
import { Routes,
     RouterModule } from '@angular/router';

import { CursussenComponent } from './cursussen.component';

const routes: Routes = [
  {
    path: '',
    component: CursussenComponent,
    data: {
      title: 'Cursussen'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CursussenRoutingModule {}
