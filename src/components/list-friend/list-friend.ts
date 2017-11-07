import { Component , OnInit} from '@angular/core';
import { NavController, AlertController, LoadingController, Loading } from 'ionic-angular';
import { AuthService} from '../../providers/services/auth-service/auth-service';
import { UserService }  from '../../providers/services/user-service/user-service';
import { LocalStorageService } from 'angular-2-local-storage';
import { User } from '../../model/entity/user/User';
import { ResponseStatus } from '../../constants/response-status-constants';
import { AddFriendsPage } from '../../pages/friends/add-friends';

@Component({
  selector: 'list-friend',
  templateUrl: 'list-friend.html'
})
export class ListFriendComponent implements OnInit {
  loading: Loading;
  response : Response;
  credentials : {};
  friendList : User[];
  user : User;

  constructor(private nav: NavController, private authService: AuthService,
    private userService: UserService,
    private alertCtrl: AlertController, private loadingCtrl: LoadingController,
    private localStorageService: LocalStorageService) {
    }

    ngOnInit(){
      this.getUserFriendList();
    }

    ionViewDidEnter() {
      this.getUserFriendList();
    }

    getUserFriendList() {
      this.showLoading();
      this.userService.getFriends().subscribe(response => {
        if(response.status === ResponseStatus.OK) {
          this.loading.dismiss();
          this.friendList  = response._body.data;
        } else {
          this.showError('Users list friends failed');
        }
      },
    );
  }

  goToAddFriends(){
    this.nav.push(AddFriendsPage);
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
    });
    this.loading.present();
  }

  showError(text) {
    this.loading.dismiss();
    let alert = this.alertCtrl.create({
      title: 'Fail',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present(prompt);
  }



}
