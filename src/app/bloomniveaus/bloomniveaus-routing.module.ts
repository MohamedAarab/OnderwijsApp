import { NgModule } from '@angular/core';
import { Routes,
     RouterModule } from '@angular/router';

import { BloomniveausComponent } from './bloomniveaus.component';

const routes: Routes = [
  {
    path: '',
    component: BloomniveausComponent,
    data: {
      title: 'Bloomniveaus'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BloomniveausRoutingModule {}
