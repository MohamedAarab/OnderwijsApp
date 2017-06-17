import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from "rxjs";

@Injectable()
export class ToetsenService {
  constructor(private http: Http) {
    console.log('ToetsenService Initialized...');
  }

  getToetsen() {
    return this.http.get('http://curcon-huict.rhcloud.com/rest/toetsen/')
      .map(res => res.json());
  }

  getToetsenByObject(obj) {
    return this.http.get(obj.href)
      .map(res => res.json());
  }

  getOsisrisResultaatTypes() {
    return this.http.get('http://curcon-huict.rhcloud.com/rest/osirisresultaattypen/')
      .map(res => res.json());
  }

  getDataByHref(href) {
    return this.http.get(href)
      .map(res => res.json());
  }

  addBeoordelingsElementToToets(toetsid, element) {
    console.log(element);
    return this.http.post('http://curcon-huict.rhcloud.com/rest/toetsen/' + toetsid + '/beoordelingselementen', element)
      .catch(this.handleError);
  }

  deleteBeoordelingselement(elementid) {
    return this.http.delete('http://curcon-huict.rhcloud.com/rest/beoordelingselementen/' + elementid)
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
