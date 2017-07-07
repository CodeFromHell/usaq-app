import { Injectable } from '@angular/core';
import { Observable }     from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { User } from '../../model/entity/User';

import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';

@Injectable()
export class UserServiceProvider  {
  private baseUrl ='http://usaq.solus.hol.es/api/user/';
  private headers = new Headers();

  constructor(private http: Http) {
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Accept' , 'application/json');
  }

  getUser(username: string): Observable<User> {
    const url = `${this.baseUrl }/?username=${username}`;
    return this.http
    .get(url)
    .map(this.extractData);
  }

  getUsers() : Observable<User> {
    return this.http
    .get(this.baseUrl)
    .map(this.extractData);
  }

  createUser(user:User): Observable<Response> {
    var endPoint =  "register";
    let options = new RequestOptions({ headers: this.headers });
    return this.http.post(this.baseUrl + endPoint, JSON.stringify(user), options)
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
