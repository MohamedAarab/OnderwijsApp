import { Injectable } from '@angular/core';
import { RequestOptions, Headers, Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class OrganisatiesService {
    headers: Headers;
	options: RequestOptions;

	constructor(private http: Http) {
		console.log('OrganisatieService Initialized...');
		this.headers = new Headers({ 'Content-Type': 'application/json' });
		this.headers.append('Access-Control-Allow-Origin', '*');
		this.options = new RequestOptions({ headers: this.headers });
	}

  getOrganisaties() {
    return this.http.get('http://curcon-huict.rhcloud.com/rest/organisaties/', this.options)
      .map(res => res.json());
  }

  getOrganisatieById(id) {
    return this.http.get('http://curcon-huict.rhcloud.com/rest/organisaties/' + id, this.options)
      .map(res => res.json());
  }

  getOrganisatieByObject(obj) {
    return this.http.get(obj.href, this.options)
      .map(res => res.json());
  }

  getDataByHref(href) {
    return this.http.get(href, this.options)
      .map(res => res.json());
  }
}
