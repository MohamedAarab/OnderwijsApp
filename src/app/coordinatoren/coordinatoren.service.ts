import { Injectable } from '@angular/core';
import {Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from "rxjs";

@Injectable()
export class CoordinatorenService {
    headers: Headers;
    options: RequestOptions;
    organisationId: any;

    constructor(private http: Http) {
        console.log('CoordinatorService Initialized...');
      this.organisationId = JSON.parse(localStorage.getItem('selectedOrganisatie'));
    }

    getCoordinatoren() {
        return this.http.get('http://curcon-huict.rhcloud.com/rest/organisaties/1/docenten')
          .map(res => res.json());
    }

    getCoordinatorenByObject(obj) {
        return this.http.get(obj.href)
          .map(res => res.json());
    }

    getDataByHref(href) {
        return this.http.get(href)
          .map(res => res.json());
    }

    addCoordinator(coordinator) {
        return this.http.post('http://curcon-huict.rhcloud.com/rest/organisaties/' + this.organisationId.id + '/docenten', coordinator)
            .catch(this.handleError);
    }

    updateCoordinator(id, form) {
      var headers = new Headers();
      headers.append('Content-Type', 'application/json');
      return this.http.put('http://curcon-huict.rhcloud.com/rest/docenten/' + id, form)
        .catch(this.handleError);
    }

    private handleError(error: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
            console.error(errMsg);
        return Observable.throw(errMsg);
    }

  editCoordinator(editCoordinatorId, editCoordinatorForm) {
    return this.http.put('http://curcon-huict.rhcloud.com/rest/docenten/' + editCoordinatorId, editCoordinatorForm)
      .catch(this.handleError);
  }
}
