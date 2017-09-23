import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import * as myGlobals from '../globals';

@Injectable()
export class BloomniveausService {
  constructor(private http: Http) {
    console.log('BloomniveausService Initialized...');
  }

  getBloomniveaus() {
    return this.http.get(myGlobals.baseUrl+'bloomniveaus/')
      .map(res => res.json());
  }

  getBloomniveausByObject(obj) {
    return this.http.get(obj.href)
      .map(res => res.json());
  }

}
