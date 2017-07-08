import { Injectable } from '@angular/core';
import { Observable }     from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { User } from '../../../model/entity/User';
import { UserURL } from '../../../constants/user-url-constants';

import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';

@Injectable()
export class UserServiceProvider  {
  private headers = new Headers();
  private options = new RequestOptions({ headers: this.headers });

  constructor(private http: Http) {
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Accept' , 'application/json');
  }

  getUser(username: string): Observable<User> {
    return this.http
    .get(UserURL.USER_GET_URL)
    .map(this.extractData);
  }

  loginUser(user:User): Observable<User> {
    return this.http
    .post(UserURL.USER_LOGIN_URL,User.toJSONFromUser(user), this.options)
    .map(this.extractResponse)
    .catch(this.handleError);
  }

  registerUser(user:User): Observable<Response> {
    return this.http
    .post(UserURL.USER_REGISTER_URL, User.toJSONFromUser(user), this.options)
    .map(this.extractResponse)
    .catch(this.handleError);
  }

  extractData(res: Response) : User {
    return User.toUserFromJSON(res.json().data);
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
