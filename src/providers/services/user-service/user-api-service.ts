import { Injectable } from '@angular/core';
import { Observable }     from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { User } from '../../../model/entity/user/User';
import { UserURL } from '../../../constants/user-url-constants';

import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';

@Injectable()
export class UserAPIService {
  private headers = new Headers();
  private options : RequestOptions;

  constructor(private http: Http) {
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Accept' , 'application/json');
    this.options = new RequestOptions({ headers: this.headers });
  }

  getAll(token: string , user:User){
    this.headers.set('X-Auth-Token' , token);
    this.options = new RequestOptions({ headers: this.headers });
    return this.http
    .get(UserURL.getUserAllURL(user.id) , this.options)
    .map(this.extractResponse)
    .catch(this.handleError);
  }

  extractData(res: Response) : User {
    return User.toUserFromJSON(res.json().data);
  }

  extractResponse(res: Response) {
    return res || {};
  }

  handleError (error: Response | any) {
    return Observable.throw(error);
  }

}
