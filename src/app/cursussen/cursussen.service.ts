import { Injectable } from '@angular/core';
import {Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from "rxjs";
import * as myGlobals from '../globals';

@Injectable()
export class CursussenService {
	headers: Headers;
	options: RequestOptions;
	organisationId: any;

constructor(private http: Http) {
	console.log('Cursussen Service Initialized...');
	this.headers = new Headers({ 'Content-Type': 'application/json' });
	this.options = new RequestOptions({ headers: this.headers });
	this.organisationId = JSON.parse(localStorage.getItem('selectedOrganisatie'));
}

getCursussen() {
	var url = myGlobals.baseUrl+'organisaties/' + this.organisationId.id + '/cursussen';
	console.log("url "+url)
	return this.http.get(url).map(res => res.json());
}

getDataByHref(href) {
	return this.http.get(href)
	.map(res => res.json());
}

getCursussenByObject(obj) {
	console.log(obj.href);
	return this.http.get(obj.href)
	.map(res => res.json());
}

addBeroepstakenToCursus(cursusId, beroepstaak) {
	let newBeroepstaak = {'id': beroepstaak.id};
	return this.http.post(myGlobals.baseUrl+'cursussen/' + cursusId + '/beroepstaken', newBeroepstaak)
	.catch(this.handleError);
}

addProfessionalskillToCursus(cursusId, professionalskillId) {
	let newProfessionalskill = {'id': professionalskillId.id};
	return this.http.post(myGlobals.baseUrl+'cursussen/' + cursusId + '/professionalskills', newProfessionalskill)
	.catch(this.handleError);
}

saveLeerdoel(cursusId, leerdoel) {
	if (leerdoel.id == null) {
		return this.http.post(myGlobals.baseUrl+'cursussen/' + cursusId + '/leerdoelen', leerdoel)
		.catch(this.handleError);	
	} else {
		var leerdoelId = leerdoel.id;
		delete leerdoel.id;
		console.log("leerdoelId "+leerdoelId);
		console.log("leerdoel "+leerdoel);
		return this.http.put(myGlobals.baseUrl+'leerdoelen/' + leerdoelId, leerdoel)
		.catch(this.handleError);
	}
}

saveToets(cursusId, toets) {
	if (toets.id == null) {
		return this.http.post(myGlobals.baseUrl+'cursussen/' + cursusId + '/toetsen', toets)
		.catch(this.handleError);	
	} else {
		var toetsId = toets.id;
		delete toets.id;
		return this.http.put(myGlobals.baseUrl+'toetsen/' + toetsId, toets)
		.catch(this.handleError);
	}
}

deleteBeroepstaak(cursusId, beroepstaakId) {
	return this.http.delete(myGlobals.baseUrl+'cursussen/' + cursusId + '/beroepstaken/' + beroepstaakId)
	.catch(this.handleError);
}

deleteProfessionalskill(cursusId, professionalskillId) {
	return this.http.delete(myGlobals.baseUrl+'cursussen/' + cursusId + '/professionalskills/' + professionalskillId)
	.catch(this.handleError);
}

deleteLeerdoel(leerdoelId) {
// console.log('http://curcon-huict.rhcloud.com/rest/leerdoelen/' + leerdoelId);
	return this.http.delete(myGlobals.baseUrl+'leerdoelen/' + leerdoelId)
	.catch(this.handleError);
}

updateCursus(id, form) {
	var headers = new Headers();
	headers.append('Content-Type', 'application/json');
// console.log('http://curcon-huict.rhcloud.com/rest/cursussen/' + id);
	return this.http.put(myGlobals.baseUrl+'cursussen/' + id, form)
	.catch(this.handleError);
}

addToetsElement(leerdoelid, form) {
	return this.http.post(myGlobals.baseUrl+'leerdoelen/' + leerdoelid + '/toetselementen', form)
	.catch(this.handleError);
}

getToetsElementen(position, url) {
	return this.http.get(url)
	.map(res => [position, res.json()]);
}



deleteToets(bt2: any) {
	return this.http.delete(myGlobals.baseUrl+'toetsen/' + bt2)
	.catch(this.handleError);
}

addCursus(cursus) {
	return this.http.post(myGlobals.baseUrl+'organisaties/' + this.organisationId.id + '/cursussen', cursus)
	.catch(this.handleError);
}

editToetsElement(id, element) {
	return this.http.put(myGlobals.baseUrl+'toetselementen/' + id, element)
	.catch(this.handleError);
}

deleteToetsElement(id) {
	return this.http.delete(myGlobals.baseUrl+'toetselementen/' + id)
	.catch(this.handleError);
}

private extractData(res: Response) {
	let body = res.json();
	return body || {};
}

private handleError(error: any) {
	let errMsg = (error.message) ? error.message :
		error.status ? `${error.status} - ${error.statusText}` : 'Server error';
	console.error(errMsg);
	return Observable.throw(errMsg);
}


}
