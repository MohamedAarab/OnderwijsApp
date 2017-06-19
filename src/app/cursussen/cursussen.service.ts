import { Injectable } from '@angular/core';
import {Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from "rxjs";

@Injectable()
export class CursussenService {
  headers: Headers;
  options: RequestOptions;
  organisationId: any;

  constructor(private http: Http) {
    console.log('CourseService Initialized...');
    this.headers = new Headers({ 'Content-Type': 'application/json'
    });

    this.options = new RequestOptions({ headers: this.headers });

    this.organisationId = JSON.parse(localStorage.getItem('selectedOrganisatie'));


  }

  getCursussen() {
    return this.http.get('http://curcon-huict.rhcloud.com/rest/organisaties/' + this.organisationId.id + '/cursussen')
      .map(res => res.json());
  }

  getDataByHref(href) {
    return this.http.get(href)
      .map(res => res.json());
  }

  getCursussenByObject(obj) {
    return this.http.get(obj.href)
      .map(res => res.json());
  }

  addBeroepstakenToCursus(cursusId, beroepstaak) {
    let newBeroepstaak = {'id': beroepstaak.id};
    return this.http.post('http://curcon-huict.rhcloud.com/rest/cursussen/' + cursusId + '/beroepstaken', newBeroepstaak)
    .catch(this.handleError);
  }

  addProfessionalskillToCursus(cursusId, professionalskillId) {
    let newProfessionalskill = {'id': professionalskillId.id};
    return this.http.post('http://curcon-huict.rhcloud.com/rest/cursussen/' + cursusId + '/professionalskills', newProfessionalskill)
    .catch(this.handleError);
  }

  addLeerdoel(cursusId, leerdoel) {
    return this.http.post('http://curcon-huict.rhcloud.com/rest/cursussen/' + cursusId + '/leerdoelen', leerdoel)
    .catch(this.handleError);
  }

  addToets(cursusId, toets) {
    return this.http.post('http://curcon-huict.rhcloud.com/rest/cursussen/' + cursusId + '/toetsen', toets)
    .catch(this.handleError);
  }

  deleteBeroepstaak(cursusId, beroepstaakId) {
    return this.http.delete('http://curcon-huict.rhcloud.com/rest/cursussen/' + cursusId + '/beroepstaken/' + beroepstaakId)
      .catch(this.handleError);
  }

  deleteProfessionalskill(cursusId, professionalskillId) {
    return this.http.delete('http://curcon-huict.rhcloud.com/rest/cursussen/' + cursusId + '/professionalskills/' + professionalskillId)
      .catch(this.handleError);
  }

  deleteLeerdoel(leerdoelId) {
//    console.log('http://curcon-huict.rhcloud.com/rest/leerdoelen/' + leerdoelId);
    return this.http.delete('http://curcon-huict.rhcloud.com/rest/leerdoelen/' + leerdoelId)
      .catch(this.handleError);
  }

  updateCursus(id, form) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    console.log('http://curcon-huict.rhcloud.com/rest/cursussen/' + id);
    return this.http.put('http://curcon-huict.rhcloud.com/rest/cursussen/' + id, form)
      .catch(this.handleError);
  }

  getToetsElementen(position, url) {
    return this.http.get(url)
      .map(res => [position, res.json()]);
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


  deleteToets(bt2: any) {
    return this.http.delete('http://curcon-huict.rhcloud.com/rest/toetsen/' + bt2)
      .catch(this.handleError);
  }

  addCursus(cursus) {
    return this.http.post('http://curcon-huict.rhcloud.com/rest/organisaties/' + this.organisationId.id + '/cursussen', cursus)
      .catch(this.handleError);
  }
}
