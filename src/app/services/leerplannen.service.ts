import { Injectable } from '@angular/core';
import {Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from "rxjs";
import * as myGlobals from '../globals';

@Injectable()
export class LeerplannenService {
    headers: Headers;
    options: RequestOptions;

    constructor(private http: Http){
        console.log('LeerplanService Initialized...')
    }

    getLeerplannen() {
        return this.http.get(myGlobals.baseUrl+'leerplannen/')
            .map(res => res.json());
    }

    getLeerplannenProfiel(cohortId) {
        return this.http.get(myGlobals.baseUrl+'leerplanschemas/' + cohortId + '/profiel')
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
}
