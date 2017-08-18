import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import * as myGlobals from '../globals';

@Injectable()
export class OpleidingenService {
    headers: Headers;
	options: RequestOptions;
	organisation: any;
  	
	constructor(private http: Http) {
		console.log('Opleidingen Service Initialized...');
		this.headers = new Headers({ 'Content-Type': 'application/json' });
		this.options = new RequestOptions({ headers: this.headers });
		this.organisation = JSON.parse(localStorage.getItem('selectedOrganisatie'));
	}

	getOpleidingen() {
		var url = myGlobals.baseUrl+'organisaties/' + this.organisation.id + '/opleidingsprofielen';
		return this.http.get(url)
			.map(res => res.json());
	}

	getDataByHref(href) {
		return this.http.get(href)
			.map(res => res.json());
	}

	getOpleidingByObject(obj) {
		return this.http.get(obj.href)
			.map(res => res.json());
	}
  
	updateOpleiding(id, form) {
		var headers = new Headers();
		headers.append('Content-Type', 'application/json');
		return this.http.put(myGlobals.baseUrl + 'opleidingsprofielen/' + id, form)
			.catch(this.handleError);
	}


	addBeroepstakenToCursus(opleidingId, beroepstaak) {
		let newBeroepstaak = {'id': beroepstaak.id};
		return this.http.post(myGlobals.baseUrl + 'opleidingsprofielen/' + opleidingId + '/beroepstaken', newBeroepstaak)
			.catch(this.handleError);
	}

	addProfessionalskillToCursus(opleidingId, professionalskillId) {
		let newProfessionalskill = {'id': professionalskillId.id};
		return this.http.post(myGlobals.baseUrl + 'opleidingsprofielen/' + opleidingId + '/professionalskills', newProfessionalskill)
		.catch(this.handleError);
	}
	
	deleteBeroepstaak(opleidingId, beroepstaakId) {
		return this.http.delete(myGlobals.baseUrl + 'opleidingsprofielen/' + opleidingId + '/beroepstaken/' + beroepstaakId)
			.catch(this.handleError);
	}

	deleteProfessionalskill(opleidingId, professionalskillId) {
		return this.http.delete(myGlobals.baseUrl + 'opleidingsprofielen/' + opleidingId + '/professionalskills/' + professionalskillId)
			.catch(this.handleError);
	}

}
