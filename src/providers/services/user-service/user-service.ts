import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { UserAPIService } from './user-api-service';
import { ResponseStatus } from '../../../constants/response-status-constants';
import { User } from '../../../model/entity/user/User';
import { LocalStorageService } from 'angular-2-local-storage';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class UserService {
  credentials : {};

  constructor (private userAPIService: UserAPIService, private localStorageService: LocalStorageService) {
    this.credentials = this.localStorageService.get('credentials');
  }


  public getAll() {
    if (this.credentials === null) {
      return Observable.throw("Not data found");
    } else {
      return Observable.create(observer => {
        console.log(this.credentials['user']);
        this.userAPIService
        .getAll(this.credentials['token'] , this.credentials['user'].data)
        .subscribe(response =>  {
          observer.next({status: response.status , _body : JSON.parse(response._body)});
          observer.complete();
        } ,
        error => {
          observer.next(error);
          observer.complete();
        })
      });
    }
  }

  public getFriends() {
    if (this.credentials === null) {
      return Observable.throw("Not data found");
    } else {
      return Observable.create(observer => {
        console.log(this.credentials['user']);
        this.userAPIService
        .getFriends(this.credentials['token'] , this.credentials['user'].data)
        .subscribe(response =>  {
          observer.next({status: response.status , _body : JSON.parse(response._body)});
          observer.complete();
        } ,
        error => {
          observer.next(error);
          observer.complete();
        })
      });
    }
  }

  public addFriend(friend : User){
    if (this.credentials === null && friend === null) {
      return Observable.throw("Not data found");
    } else {
      return Observable.create(observer => {
        this.userAPIService
        .addFriend(this.credentials['user'].data , friend)
        .subscribe(response =>  {
          console.log(response);
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

  public deleteFriend(friend : User){
    if (this.credentials === null && friend === null) {
      return Observable.throw("Not data found");
    } else {
      return Observable.create(observer => {
        this.userAPIService
        .deleteFriend(this.credentials['token'],this.credentials['user'].data , friend)
        .subscribe(response =>  {
          console.log(response);
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

}
