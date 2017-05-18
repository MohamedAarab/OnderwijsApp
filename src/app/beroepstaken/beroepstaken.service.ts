import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs';

// Observable class extensions
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';

// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';



@Injectable()
export class BeroepstakenService {
  headers: Headers;
  options: RequestOptions;

  constructor(private http: Http) {
    console.log('BeroepstakenService Initialized...');
    this.headers = new Headers({ 'Content-Type': 'text/plain', 'server': 'Apache-Coyote/1.1'
    });
    this.options = new RequestOptions({ headers: this.headers });
  }

  getBeroepstaken() {
    return this.http.get('http://curcon-huict.rhcloud.com/rest/beroepstaken/')
      .map(res => res.json());
  }

  getBeroepstakenByObject(obj) {
    return this.http.get(obj.href)
      .map(res => res.json());
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
