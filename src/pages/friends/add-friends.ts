import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, Loading, IonicPage } from 'ionic-angular';
import { AuthService} from '../../providers/services/auth-service/auth-service';
import { UserService }  from '../../providers/services/user-service/user-service';
import { LocalStorageService } from 'angular-2-local-storage';
import { User } from '../../model/entity/user/User';
import { ResponseStatus } from '../../constants/response-status-constants';
import { HomePage } from '../../pages/home/home';

@IonicPage()
@Component({
  selector: 'page-add-friends',
  templateUrl: 'add-friends.html',
})
export class AddFriendsPage {
  loading: Loading;
  response : Response;
  credentials : {};
  userList : User[];
  userFriendsList : User[]
  user : User;
  selectedFriend : User;

  constructor(private nav: NavController, private authService: AuthService,
    private userService: UserService,
    private alertCtrl: AlertController, private loadingCtrl: LoadingController,
    private localStorageService: LocalStorageService) {
    }

    ngOnInit(){
      this.credentials = this.localStorageService.get('this.credentials');
      this.getAllUser();
    }

    getAllUser() {
      this.showLoading();
      this.userService.getAll().subscribe(response => {
        if(response.status === ResponseStatus.OK) {
          this.loading.dismiss();
          this.userList  = response._body.data;
        } else {
          this.showPopUp('Error','Users list friends failed');
        }
      },
    );
  }


  logout() {
    this.showLoading();
    this.authService.logout().subscribe(response => {
      if (response === ResponseStatus.OK) {
        this.localStorageService.clearAll();
        this.loading.dismiss();
        this.nav.setRoot('LoginPage');
      } else {
        this.showPopUp('Error','Logout failed');
      }
    },
    error => {
      console.log("Error", error);
    });
  }

  addFriend(user : User){
    this.showLoading();
    this.userService.addFriend(user)
    .subscribe(response => {
      if (response === ResponseStatus.OK) {
        this.userList = this.userList.filter(friend =>  friend.id != user.id);
        this.showPopUp('Great!', 'You have a new friend!');
      } else {
        this.showPopUp('Error!', 'An error occurred, please try again later.');
      }
    },
    error => {
      console.log("Error", error);
    });
  }

  goToHome(){
      this.nav.setRoot(HomePage);
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
    });
    this.loading.present();
  }

  showPopUp(title,text) {
    this.loading.dismiss();
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons: ['OK'],
      cssClass: "popUp"
    });
    alert.present(prompt);
  }

}
