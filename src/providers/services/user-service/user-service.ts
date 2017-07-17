import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { UserAPIService } from './user-api-service';
import { ResponseStatus } from '../../../constants/response-status-constants';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class UserService {

  constructor (private userAPIService: UserAPIService) {
  }

  public getAll(credentials) {
    if (credentials === null) {
      return Observable.throw("xxxx");
    } else {
      return Observable.create(observer => {
        console.log(credentials['user']);
        this.userAPIService
        .getAll(credentials['token'] , credentials['user'].data)
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
}
