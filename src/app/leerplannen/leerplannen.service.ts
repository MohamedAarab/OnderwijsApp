import { Injectable } from '@angular/core';
import { Http } from '@angular/http'
import 'rxjs/add/operator/map';

@Injectable()
export class LeerplannenService {
  constructor(private http: Http){
    console.log('LeerplanService Initialized...')
  }

  getLeerplannen() {
    return this.http.get('http://curcon-huict.rhcloud.com/rest/leerplannen/')
      .map(res => res.json());
  }

  getDataByHref(href) {
    return this.http.get(href)
      .map(res => res.json());
  }
}
