import { Injectable } from '@angular/core';
import {Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from "rxjs";
import * as myGlobals from '../globals';

@Injectable()
export class OpleidingenService {
    headers: Headers;
	options: RequestOptions;
	organisation: any;
  	
	constructor(private http: Http) {
		console.log('OpleidingenService Initialized...');
		this.headers = new Headers({ 'Content-Type': 'application/json' });
		this.headers.append('Access-Control-Allow-Origin', '*');
		this.options = new RequestOptions({ headers: this.headers });
		this.organisation = JSON.parse(localStorage.getItem('selectedOrganisatie'));
	}

	getOpleidingen() {
		var url = myGlobals.baseUrl+'organisaties/' + this.organisation.id + '/opleidingsprofielen';
		console.log(url);
		return this.http.get(url, this.options).map(res => res.json());
	}

	getDataByHref(href) {
		return this.http.get(href, this.options)
			.map(res => res.json());
	}

	getOpleidingByObject(obj) {
		return this.http.get(obj.href, this.options)
			.map(res => res.json());
	}
  
	saveOpleiding(opleiding) {
		if (opleiding.id == null) {
			return this.http.post(myGlobals.baseUrl+'organisaties/' + this.organisation.id + '/opleidingsprofielen', opleiding)
				.catch(this.handleError);	
		} else {
			var url = myGlobals.baseUrl+'opleidingsprofielen/'+ opleidingId;
			console.log(url);
			var opleidingId = opleiding.id;
			delete opleiding.id;
			return this.http.put(url, opleiding)
				.catch(this.handleError);
		}
	}

	addBeroepstakenToOpleiding(opleidingId, beroepstaak) {
		let newBeroepstaak = {'id': beroepstaak.id};
		return this.http.post(myGlobals.baseUrl + 'opleidingsprofielen/' + opleidingId + '/beroepstaken', newBeroepstaak)
			.catch(this.handleError);
	}

	addProfessionalskillToOpleiding(opleidingId, professionalskillId) {
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

	private handleError(error: any) {
		let errMsg = (error.message) ? error.message :
			error.status ? `${error.status} - ${error.statusText}` : 'Server error';
		console.error(errMsg);
		return Observable.throw(errMsg);
	}

}
