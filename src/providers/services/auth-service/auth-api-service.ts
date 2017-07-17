import { Injectable } from '@angular/core';
import { Observable }     from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { User } from '../../../model/entity/user/User';
import { UserURL } from '../../../constants/user-url-constants';

import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';

@Injectable()
export class AuthAPIService  {
  private headers = new Headers();
  private options : RequestOptions;

  constructor(private http: Http) {
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Accept' , 'application/json');
    this.options = new RequestOptions({ headers: this.headers });
  }

  login(user: User): Observable<Response> {
    return this.http
    .post(UserURL.USER_LOGIN_URL,User.toJSONFromUser(user), this.options)
    .map(this.extractResponse)
    .catch(this.handleError);
  }

  register(user:User): Observable<Response> {
    return this.http
    .post(UserURL.USER_REGISTER_URL, User.toJSONFromUser(user), this.options)
    .map(this.extractResponse)
    .catch(this.handleError);
  }

  logout(token : string){
    this.headers.set('X-Auth-Token' , token);
    this.options = new RequestOptions({ headers: this.headers });
    return this.http
    .post(UserURL.USER_LOGOUT_URL, token , this.options)
    .map(this.extractResponse)
    .catch(this.handleError);
  }

  extractData(res: Response) : User {
    return User.toUserFromJSON(res.json().data);
  }

  extractResponse(res: Response) {
    console.log(res);
    return res || {};
  }

  handleError (error: Response | any) {
    return Observable.throw(error);
  }

}
