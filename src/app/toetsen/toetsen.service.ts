import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

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

  getDataByHref(href) {
    return this.http.get(href)
      .map(res => res.json());
  }
}
