import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { LocalStorageService } from 'angular-2-local-storage';
import { AuthAPIService } from './auth-api-service';
import { User } from '../../../model/entity/user/User';
import { ResponseStatus } from '../../../constants/response-status-constants';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class AuthService {
  credentials : {};

  constructor (private authAPIService: AuthAPIService,
    private localStorageService: LocalStorageService) {
      this.credentials = this.localStorageService.get('credentials');
    }

    public login(credentials) {
      if (credentials.username === null || credentials.password === null) {
        return Observable.throw("Please insert credentials");
      } else {
        return Observable.create(observer => {
          this.authAPIService
          .login(credentials)
          .subscribe(response =>  {
            var jsonData = response.json().data;
            this.localStorageService
            .set('credentials', { token: jsonData.token  , user : jsonData.user});
            observer.next(ResponseStatus.OK);
            observer.complete();
          } ,
          error => {
            observer.next(error.json()['detail']);
            observer.complete();
          })
        });
      }
    }

    public register(credentials) {
      if (credentials.email === null || credentials.password === null ||
        credentials.password_repeat === null) {
          return Observable.throw("Please insert credentials");
        } else {
          return Observable.create(observer => {
            this.authAPIService.register(credentials)
            .subscribe(response => {
              observer.next(ResponseStatus.OK);
              observer.complete();
            } ,
            error => {
              observer.next(error.json()['detail']);
              observer.complete();
            });
          });
        }
      }

      public logout() {
        return Observable.create(observer => {
          this.authAPIService
          .logout(this.credentials['token'])
          .subscribe( response => {
            observer.next(ResponseStatus.OK);
            observer.complete();
          } ,
          error => {
            observer.next(error.json()['detail']);
            observer.complete();
          });
        });
      }
    }
