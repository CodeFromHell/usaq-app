import { Injectable } from '@angular/core';
import { Observable }     from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { User } from '../../model/entity/User';
import { ApiUtils } from '../../utils/apiUtils';

import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';

@Injectable()
export class UserServiceProvider  {
  private headers = new Headers();

  constructor(private http: Http) {
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Accept' , 'application/json');
  }

  getUser(username: string): Observable<User> {
    return this.http
    .get(ApiUtils.LOGIN_URL)
    .map(this.extractData);
  }

  createUser(user:User): Observable<Response> {
    let options = new RequestOptions({ headers: this.headers });
    return this.http.post(ApiUtils.REGISTER_URL, JSON.stringify(user), options)
    .map(this.extractResponse)
    .catch(this.handleError);
  }

  extractData(res: Response) {
    return res.json().data as User;
  }

  extractResponse(res: Response) {
    let body = res.json();
    return body || {};
  }

  handleError (error: Response | any) {
    console.error(error.message || error);
    return Observable.throw(error.message || error);
  }

}
