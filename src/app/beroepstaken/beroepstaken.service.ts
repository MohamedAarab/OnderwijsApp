import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class BeroepstakenService {
  constructor(private http: Http) {
    console.log('BeroepstakenService Initialized...');
  }

  getBeroepstaken() {
    return this.http.get('http://curcon-huict.rhcloud.com/rest/beroepstaken/')
      .map(res => res.json());
  }

  getBeroepstaakByObject(obj) {
    return this.http.get(obj.href)
      .map(res => res.json());
  }

}
