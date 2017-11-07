import { Component ,  Input, Output } from '@angular/core';
import { NavController, AlertController, LoadingController, Loading } from 'ionic-angular';
import { UserService }  from '../../providers/services/user-service/user-service';
import { LocalStorageService } from 'angular-2-local-storage';
import { User } from '../../model/entity/user/User';
import { ResponseStatus } from '../../constants/response-status-constants';
import { AddFriendsPage } from '../../pages/friends/add-friends';

@Component({
  selector: 'item-list-friend',
  templateUrl: 'item-list-friend.html'
})
export class ItemListFriendComponent {

  @Input() friend : User ;
  @Input() friendList : User[];

  loading: Loading;
  response : Response;
  credentials : {};
  user : User;
  deleteFriendSelected : User;

  constructor(private nav: NavController,
    private userService: UserService,
    private alertCtrl: AlertController, private loadingCtrl: LoadingController,
    private localStorageService: LocalStorageService) {
    }



  deleteFriend(friendSelected : User){
    this.userService.deleteFriend(friendSelected)
    .subscribe(response => {
      if (response === ResponseStatus.OK) {
        this.friendList = this.friendList.filter(friend =>  friend.id != friendSelected.id);
        this.showError('Friend deleted!') ;
        this.refreshPage();
      } else {
        this.showError('Error! An error occurred, please try again later.');
      }
    },
    error => {
      console.log("Error", error);
    });
  }


    showError(text) {
      let alert = this.alertCtrl.create({
        title: '',
        subTitle: text,
        buttons: ['OK']
      });
      alert.present(prompt);
    }

refreshPage() {
  this.nav.setRoot(this.nav.getActive().component);
}


}
