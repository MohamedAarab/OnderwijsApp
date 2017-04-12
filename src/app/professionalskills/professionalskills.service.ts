import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ProfessionalskillsService {
  constructor(private http: Http) {
    console.log('ProfessionalskillsService Initialized...');
  }

  getProfessionalskills() {
    return this.http.get('http://curcon-huict.rhcloud.com/rest/professionalskills/')
      .map(res => res.json());
  }

  getProfessionalskillByObject(obj) {
    return this.http.get(obj.href)
      .map(res => res.json());
  }

}
