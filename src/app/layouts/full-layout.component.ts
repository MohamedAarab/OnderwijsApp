import { Component, OnInit } from '@angular/core';
import {OrganisatiesService} from '../organisaties/organisaties.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './full-layout.component.html',
  providers: [OrganisatiesService],
})
export class FullLayoutComponent implements OnInit {

  public disabled: boolean = false;
  public status: {isopen: boolean} = {isopen: false};
  public allOrganisaties: Array<any>;
  public selectedOrganisatie: Object;

  public toggled(open: boolean): void {
    console.log('Dropdown is now: ', open);
  }

  public toggleDropdown($event: MouseEvent): void {
    $event.preventDefault();
    $event.stopPropagation();
    this.status.isopen = !this.status.isopen;
  }

  ngOnInit(): void {

  }

  onChange(item) {
    this.organisatieService.getOrganisatieById(item).subscribe(organisatie => {
      localStorage.setItem('selectedOrganisatie', JSON.stringify(organisatie));
      this.selectedOrganisatie = organisatie.naam;
    });
  }

  constructor(private organisatieService: OrganisatiesService) {
    organisatieService.getOrganisaties().subscribe(organisaties => {
      this.allOrganisaties = organisaties;
      if(localStorage.getItem('selectedOrganisatie') == null)
        localStorage.setItem('selectedOrganisatie', JSON.stringify(this.allOrganisaties[0]));
      console.log(this.allOrganisaties);
    });

    this.selectedOrganisatie = JSON.parse(localStorage.getItem('selectedOrganisatie')).naam;
  }
}
