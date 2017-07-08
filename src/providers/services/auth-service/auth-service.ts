import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { LocalStorageService } from 'angular-2-local-storage';
import { UserServiceProvider } from '../user-service/user-service';
import { ResponseStatus } from '../../../constants/response-status-constants';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class AuthServiceProvider {
  registerResult : boolean = false;
  constructor (private userServiceProvider : UserServiceProvider,
    private localStorageService: LocalStorageService) {
    }

    public login(credentials) {
      if (credentials.username === null || credentials.password === null) {
        return Observable.throw("Please insert credentials");
      } else {
        return Observable.create(observer => {
          this.userServiceProvider
          .loginUser(credentials)
          .subscribe(response =>  {
            if(response.hasOwnProperty('status')){
              if(response['status'] === ResponseStatus.ERROR_INTERNAL_SERVER){
                observer.next(false);
                observer.complete();
              }
            } else if(response.hasOwnProperty('token')) {
              console.log(response['token']);
              this.localStorageService
              .set('credentials', JSON.stringify({token: response['token'] , username: credentials.username }));
              console.log(this.localStorageService.get("credentials"));
              observer.next(true);
              observer.complete();
            }
          } , error => {
            observer.next(false);
            observer.complete();
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
