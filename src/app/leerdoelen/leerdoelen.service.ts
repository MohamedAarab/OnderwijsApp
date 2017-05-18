import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class LeerdoelenService {
  constructor(private http: Http) {
    console.log('LeerplanService Initialized...');
  }

  getLeerdoelen() {
    return this.http.get('http://curcon-huict.rhcloud.com/rest/leerdoelen/')
      .map(res => res.json());
  }

  getLeerdoelenByObject(obj) {
    console.log(obj.href);
    return this.http.get(obj.href)
      .map(res => res.json());
  }

  getDataByHref(href) {
    return this.http.get(href)
      .map(res => res.json());
  }
}
