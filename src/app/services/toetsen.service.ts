import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from "rxjs";
import * as myGlobals from '../globals';

@Injectable()
export class ToetsenService {
  constructor(private http: Http) {
    console.log('ToetsenService Initialized...');
  }

  getToetsen() {
    return this.http.get('myGlobals.baseUrl'+'toetsen/')
      .map(res => res.json());
  }

  getToetsenByObject(obj) {
    return this.http.get(obj.href)
      .map(res => res.json());
  }

  getOsisrisResultaatTypes() {
    return this.http.get('myGlobals.baseUrl'+'osirisresultaattypen/')
      .map(res => res.json());
  }

  getDataByHref(href) {
    return this.http.get(href)
      .map(res => res.json());
  }

	saveBeoordelingsElement(toetsId, element) {
		if (element.id == null) {
			return this.http.post(myGlobals.baseUrl+'toetsen/' + toetsId + '/beoordelingselementen', element)
			.catch(this.handleError);	
		} else {
			var elementId = element.id;
			delete element.id;
			return this.http.put(myGlobals.baseUrl+'beoordelingselementen/' + elementId, element)
			.catch(this.handleError);
		}
	}

	deleteBeoordelingselement(elementid) {
		return this.http.delete(myGlobals.baseUrl+'beoordelingselementen/' + elementid)
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
