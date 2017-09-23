import { NgModule } from '@angular/core';
import { Routes,
     RouterModule } from '@angular/router';

import { OpleidingenComponent } from './opleidingen.component';

const routes: Routes = [
	{
		path: '',
		component: OpleidingenComponent,
		data: {
			title: 'Opleidingsprofielen'
		}
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class OpleidingenRoutingModule {}
