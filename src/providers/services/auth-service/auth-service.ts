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
            if(response.hasOwnProperty('status')) {
              if(response['status'] === ResponseStatus.OK) {
                var jsonData = response.json().data;
                this.localStorageService
                .set('credentials', JSON.stringify({token: jsonData.token , username: jsonData.username }));
                observer.next(true);
                observer.complete();
              }
            }
          } ,
          error => {
            observer.next(error);
            observer.complete();
          })
        });
      }
    }

    public register(credentials) {
      if (credentials.email === null || credentials.password === null || credentials.password_repeat === null) {
        return Observable.throw("Please insert credentials");
      } else {
        return Observable.create(observer => {
          this.userServiceProvider.registerUser(credentials)
          .subscribe(response => {
            if(response.hasOwnProperty('status')){
              if(response['status'] === ResponseStatus.OK) {
                observer.next(true);
                observer.complete();
              }
            }
          } ,
          error => {
            observer.next(error);
            observer.complete();
          });
        });
      }
    }

    public logout() {
      var credentials : {} =  this.localStorageService.get("credentials");
      return Observable.create(observer => {
        this.userServiceProvider
        .logoutUser(JSON.stringify(credentials['token']))
        .subscribe( response => {
          if(response.hasOwnProperty('status')){
            if(response['status'] === ResponseStatus.OK) {
              observer.next(true);
              observer.complete();
            }
          }
        } ,
        error => {
          observer.next(error);
          observer.complete();
        });
      });
    }


  }
