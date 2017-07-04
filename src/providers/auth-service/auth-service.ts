import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { User } from '../../model/entity/User';
import { UserServiceProvider } from '../user-service/user-service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class AuthServiceProvider {
  currentUser : any ;
  constructor (private userServiceProvider : UserServiceProvider) {

  }

  public login(credentials) {
    if (credentials.username === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else {
      return Observable.create(observer => {
        this.userServiceProvider
        .getUser(credentials.username)
        .subscribe(user => {this.currentUser = user;
          console.log(this.currentUser);
          if(this.currentUser.length == 0) {
            observer.next(false);
            observer.complete();
          } else {
            let access = this.validateLogin(credentials,this.currentUser);
              observer.next(access);
              observer.complete();
            }
          })
        });
      }
    }

    private validateLogin (credentials,currentUser) {
      let access = (credentials.username === currentUser[0].username
        && credentials.password === currentUser[0].password);
        return access;
    }

    public register(credentials) {
      if (credentials.email === null || credentials.password === null) {
        return Observable.throw("Please insert credentials");
      } else {
        return Observable.create(observer => {
          observer.next(true);
          observer.complete();
        });
      }
    }


    public logout() {
      return Observable.create(observer => {
        this.currentUser = null;
        observer.next(true);
        observer.complete();
      });
    }


  }
