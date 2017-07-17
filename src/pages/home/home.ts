import { Component , OnInit} from '@angular/core';
import { NavController, AlertController, LoadingController, Loading, IonicPage } from 'ionic-angular';
import { AuthService} from '../../providers/services/auth-service/auth-service';
import { UserService }  from '../../providers/services/user-service/user-service';
import { LocalStorageService } from 'angular-2-local-storage';
import { User } from '../../model/entity/user/User';
import { ResponseStatus } from '../../constants/response-status-constants';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {
  loading: Loading;
  credentials = {};
  response : Response;
  userList : User[];
  userCount : Number;

  constructor(private nav: NavController, private authService: AuthService,
    private userService: UserService,
    private alertCtrl: AlertController, private loadingCtrl: LoadingController,
    private localStorageService: LocalStorageService) {
      this.credentials = this.localStorageService.get('credentials');
    }

    ngOnInit(){
      this.getUserList();
    }

    getUserList() {
      this.showLoading();
      this.userService.getAll(this.credentials).subscribe(response => {
        if(response.status === ResponseStatus.OK) {
          this.loading.dismiss();
          this.userList  = response._body.data;
          this.userCount = response._body.meta.count;
        } else {
          this.showError('Users list failed');
        }
      },
    );
  }

  logout() {
    this.showLoading();
    this.authService.logout(this.credentials).subscribe(response => {
      if (response === ResponseStatus.OK) {
        this.localStorageService.clearAll();
        this.loading.dismiss();
        this.nav.setRoot('LoginPage');
      } else {
        this.showError('Logout failed');
      }
    },
    error => {
      console.log("Error", error);
    });
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
