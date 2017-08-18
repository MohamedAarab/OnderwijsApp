import { Injectable } from '@angular/core';
import {Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from "rxjs";

@Injectable()
export class DocentenService {
    headers: Headers;
    options: RequestOptions;
    organisationId: any;

    constructor(private http: Http) {
        console.log('DocentenService Initialized...');
      this.organisationId = JSON.parse(localStorage.getItem('selectedOrganisatie'));
    }

    getDocenten() {
        return this.http.get('http://curcon-huict.rhcloud.com/rest/organisaties/1/docenten')
          .map(res => res.json());
    }

    getDocentenByObject(obj) {
        return this.http.get(obj.href)
          .map(res => res.json());
    }

    getDataByHref(href) {
        return this.http.get(href)
          .map(res => res.json());
    }

     private handleError(error: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
            console.error(errMsg);
        return Observable.throw(errMsg);
    }
	
	saveDocent(docentId, docentForm) {
		var headers = new Headers();
		headers.append('Content-Type', 'application/json');
		if (docentId == 0) {
			return this.http.post('http://curcon-huict.rhcloud.com/rest/docenten/', docentForm)
				.catch(this.handleError);
		} else {
			return this.http.put('http://curcon-huict.rhcloud.com/rest/docenten/' + docentId, docentForm)
				.catch(this.handleError);
		}
	}
}
