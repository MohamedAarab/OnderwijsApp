import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class OrganisatiesService {
  constructor(private http: Http) {
    console.log('OrganisatieService Initialized...');
  }

  getOrganisaties() {
    return this.http.get('http://curcon-huict.rhcloud.com/rest/organisaties/')
      .map(res => res.json());
  }

  getOrganisatieById(id) {
    return this.http.get('http://curcon-huict.rhcloud.com/rest/organisaties/' + id)
      .map(res => res.json());
  }

  getOrganisatieByObject(obj) {
    return this.http.get(obj.href)
      .map(res => res.json());
  }

  getDataByHref(href) {
    return this.http.get(href)
      .map(res => res.json());
  }
}
