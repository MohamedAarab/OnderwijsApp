import { NgModule } from '@angular/core';
import { Routes,
     RouterModule } from '@angular/router';

import { BeroepstakenComponent } from './professionalskills.component';

const routes: Routes = [
  {
    path: '',
    component: BeroepstakenComponent,
    data: {
      title: 'Professional Skills'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfessionalskillsRoutingModule {}
