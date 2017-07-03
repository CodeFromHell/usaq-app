import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { User } from '../../model/entity/User';
import { Subject }           from 'rxjs/Subject';
import { UserServiceProvider } from '../user-service/user-service';
import 'rxjs/add/operator/map';
// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

@Injectable()
export class AuthServiceProvider {
  currentUser : User ;
  constructor (private userServiceProvider : UserServiceProvider) {

  }

  public login(credentials) {
    if (credentials.username === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else {
      return Observable.create(observer => {
        this.currentUser = new User("","");
        this.userServiceProvider.getUserByUsername(credentials.username)
        .subscribe(user => { this.currentUser = user
          console.log(this.currentUser[0]);
          let access = (credentials.username === this.currentUser[0].username
            && credentials.password === this.currentUser[0].password);
            observer.next(access);
            observer.complete();
        });
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
