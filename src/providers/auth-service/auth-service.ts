import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { User } from '../../model/entity/User';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthServiceProvider {
  currentUser: User;

  public login(credentials) {
    if (credentials.username === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else {
      return Observable.create(observer => {
        this.currentUser = { username : 'Alex' , password : '1234'};
        let access = (credentials.username === this.currentUser.username
          && credentials.password === this.currentUser.password);
        observer.next(access);
        observer.complete();
      });
    }
  }

  public register(credentials) {
    if (credentials.email === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else {
      // At this point store the credentials to your backend!
      return Observable.create(observer => {
        observer.next(true);
        observer.complete();
      });
    }
  }

  public getUserInfo() : User {
    return this.currentUser;
  }

  public logout() {
    return Observable.create(observer => {
      this.currentUser = null;
      observer.next(true);
      observer.complete();
    });
  }
}
