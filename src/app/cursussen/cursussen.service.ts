import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class CursussenService {
  constructor(private http: Http) {
    console.log('CourseService Initialized...');
  }

  getCursussen() {
    return this.http.get('http://curcon-huict.rhcloud.com/rest/cursussen/')
      .map(res => res.json());
  }

  getDataByHref(href) {
    return this.http.get(href)
      .map(res => res.json());
  }

  getCursusByObject(obj) {
    return this.http.get(obj.href)
      .map(res => res.json());
  }
}
