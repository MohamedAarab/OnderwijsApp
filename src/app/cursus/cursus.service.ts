import { Injectable } from '@angular/core';
import { Http } from '@angular/http'
import 'rxjs/add/operator/map';

@Injectable()
export class CursusService {
  constructor(private http: Http){
    console.log('PostsService Initialized...')
  }

  getCursussen(){
    return this.http.get('http://curcon-huict.rhcloud.com/rest/cursussen/')
      .map(res => res.json());
  }
}
