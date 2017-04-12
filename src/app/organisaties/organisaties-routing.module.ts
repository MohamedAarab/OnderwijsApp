import { NgModule } from '@angular/core';
import { Routes,
     RouterModule } from '@angular/router';

import { OrganisatiesComponent } from './organisaties.component';

const routes: Routes = [
  {
    path: '',
    component: OrganisatiesComponent,
    data: {
      title: 'Organisaties'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrganisatiesRoutingModule {}
