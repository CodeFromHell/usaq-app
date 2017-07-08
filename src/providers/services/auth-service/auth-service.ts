import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { UserServiceProvider } from '../user-service/user-service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class AuthServiceProvider {
  token : string ;
  registerResult : boolean = false;
  constructor (private userServiceProvider : UserServiceProvider) {}

  public login(credentials) {
    if (credentials.username === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else {
      return Observable.create(observer => {
        this.userServiceProvider
        .loginUser(credentials)
        .subscribe(response =>  {
            this.token = response['token'];
            console.log(this.token);
        })
      });
    }
  }

    public register(credentials) {
      if (credentials.email === null || credentials.password === null) {
        return Observable.throw("Please insert credentials");
      } else {
        return Observable.create(observer => {
          this.userServiceProvider.registerUser(credentials)
          .subscribe(response => {
            this.registerResult =  (response['result'] == 'OK')  ? true : false;
            observer.next(this.registerResult);
            observer.complete();
          });
        });
      }
    }


    public logout() {
      return Observable.create(observer => {
        observer.next(true);
        observer.complete();
      });
    }


  }
