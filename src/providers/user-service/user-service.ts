import { Injectable } from '@angular/core';
import { Observable }     from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { User } from '../../model/entity/User';


import 'rxjs/add/operator/catch';

@Injectable()
export class UserServiceProvider  {
  private userUrl ='api/user';
  constructor(private http: Http) {}

  getUser(username: string): Observable<User> {
    const url = `${this.userUrl}/?username=${username}`;
    return this.http
    .get(url)
    .map(this.extractData);
  }

  getUsers() : Observable<User> {
    return this.http
    .get(this.userUrl)
    .map(this.extractData);
  }

  createUser(user:User): Observable<User> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.userUrl, user, options)
    .map(this.extractResponse)
    .catch(this.handleError);
  }

  extractData(res: Response) {
    return res.json().data as User;
  }

  extractResponse(res: Response) {
    let body = res.json();
    console.log(body);
    return body || {};
  }

  handleError (error: Response | any) {
    console.error(error.message || error);
    return Observable.throw(error.message || error);
  }

}
