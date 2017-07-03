import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { User } from '../../model/entity/User';

@Injectable()
export class UserServiceProvider {
  private userUrl ='api/user';
  public user : User = new User("","");
  constructor(private http: Http) {}

  getUserByUsername(username: string): Observable<User> {
    const url = `${this.userUrl}/?username=${username}`;
    return this.http
               .get(url)
               .map(response => response.json().data as User);
  }


  getUsers() : Observable<User> {
      return this.http
               .get(this.userUrl)
               .map(response => response.json().data as User);

  }

}
