import {Component, OnInit} from '@angular/core';
import {OrganisatiesService} from "./organisaties/organisaties.service";

@Component({
  // tslint:disable-next-line
  selector: 'body',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent implements OnInit {
  allOrganisaties: Array<any>;
  selectedOrganisatie: string;

  ngOnInit(): void {
//    localStorage.setItem("")

  }

  constructor(private organisatieService: OrganisatiesService) {


  }
}
