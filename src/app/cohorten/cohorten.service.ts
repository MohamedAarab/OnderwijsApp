import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class CohortenService {
  constructor(private http: Http) {
    console.log('LeerplanService Initialized...');
  }

  getCohorten() {
    return this.http.get('http://curcon-huict.rhcloud.com/rest/cohorten/')
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
}