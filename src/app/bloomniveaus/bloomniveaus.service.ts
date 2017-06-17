import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class BloomniveausService {
  constructor(private http: Http) {
    console.log('BloomniveausService Initialized...');
  }

  getBloomniveaus() {
    return this.http.get('http://curcon-huict.rhcloud.com/rest/bloomniveaus/')
      .map(res => res.json());
  }

  getBloomniveausByObject(obj) {
    return this.http.get(obj.href)
      .map(res => res.json());
  }

}
