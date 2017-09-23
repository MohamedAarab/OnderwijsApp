import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from "rxjs";
import * as myGlobals from '../globals';

@Injectable()
export class CohortenService {
  constructor(private http: Http) {
    console.log('CohortenService Initialized...');
  }

  getCohorten() {
    return this.http.get(myGlobals.baseUrl+'cohorten/')
      .map(res => res.json());
  }

  getCohortenByObject(obj) {
    return this.http.get(obj.href)
      .map(res => res.json());
  }

  getDataByHref(href) {
    return this.http.get(href)
      .map(res => res.json());
  }
 
	saveCohort(opleidingId, cohort) {
		return this.http.post(myGlobals.baseUrl+'opleidingen/' + opleidingId + '/cohorten', cohort)
			.catch(this.handleError);	
		
	}

    addCursusToCohort(cohortId, cursus){
        return this.http.post(myGlobals.baseUrl+'cohorten/' + cohortId + '/cursussen', cursus)
            .catch(this.handleError);
    }

    deleteCursus(cohortId, cursusId) {
        // Verwijdert een cursus uit een cohort (examenprogramma), cursus zelf wordt niet verwijderd.
        return this.http.delete(myGlobals.baseUrl+'cohorten/' + cohortId + '/cursussen/' + cursusId)
            .catch(this.handleError);
    }

	private handleError(error: any) {
		let errMsg = (error.message) ? error.message :
			error.status ? `${error.status} - ${error.statusText}` : 'Server error';
		console.error(errMsg);
		return Observable.throw(errMsg);
	}
}
