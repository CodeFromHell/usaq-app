
import { AppConfig } from '../app/app-config';

export class UserURL  {
     static  USER_GET_URL = AppConfig.BASE_URL + 'user/';
     static  USER_REGISTER_URL = AppConfig.BASE_URL +  'user/register';
     static  USER_LOGIN_URL = AppConfig.BASE_URL + 'user/login';
     static  USER_LOGOUT_URL = AppConfig.BASE_URL + 'user/logout';
     static  USER_ALL =  "/all";
     static  USER_FRIENDS =  "/friends";


     static getUserAllURL(id : string){
       return this.USER_GET_URL + id + this.USER_ALL;
     }

     static getUserFriendURL(id : string){
       return this.USER_GET_URL + id + this.USER_FRIENDS;
     }

     static getUserFriendDeleteURL(userId : string , friendId : string){
       return this.USER_GET_URL + userId + this.USER_FRIENDS +  "?friend_id=" + friendId;
     }
}
