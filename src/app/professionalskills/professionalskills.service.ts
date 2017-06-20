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

  getProfessionalskillsByObject(obj) {
    return this.http.get(obj.href)
      .map(res => res.json());
  }

  getProfessionalskillsTypes() {
    return this.http.get('http://curcon-huict.rhcloud.com/rest/professionalskills/types')
      .map(res => res.json());
  }


  getProfessionalskillId(skillid, niv) {
    return this.http.get('http://curcon-huict.rhcloud.com/rest/professionalskills/skill/' + skillid + '/niveaus/' + niv)
      .map(res => res.json());
  }
}
