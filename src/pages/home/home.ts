import { Component , OnInit} from '@angular/core';
import { NavController, AlertController, LoadingController, Loading, IonicPage } from 'ionic-angular';
import { AuthService} from '../../providers/services/auth-service/auth-service';
import { UserService }  from '../../providers/services/user-service/user-service';
import { LocalStorageService } from 'angular-2-local-storage';
import { User } from '../../model/entity/user/User';
import { ResponseStatus } from '../../constants/response-status-constants';
import { GifProfiles } from '../../constants/gif-profiles';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {
  loading: Loading;
  response : Response;
  credentials : {};
  user : User;
  profileImage : string = "";

  constructor(private nav: NavController, private authService: AuthService,
    private userService: UserService,
    private alertCtrl: AlertController, private loadingCtrl: LoadingController,
    private localStorageService: LocalStorageService) {
    }

    ngOnInit(){
      this.credentials = this.localStorageService.get('credentials');
      this.user = this.credentials['user'].data;
      this.getProfileImage();
    }


    getProfileImage(){
      switch(this.user.username){
        case 'Maite' :
        this.profileImage = GifProfiles.GATETE;
        break;
        case  'Alex':
        this.profileImage = GifProfiles.MONETE;
        break;
        case  'ffff':
        this.profileImage = GifProfiles.LLAMA;
        break;
        case  'aaaa':
        this.profileImage = GifProfiles.CARTON;
        break;
        case 'xxxx' :
        this.profileImage = GifProfiles.PERRETE;
        break;
        default:
        this.profileImage = GifProfiles.FUCKYOU;
      }
    }

    presentPrompt() {
    let alert = this.alertCtrl.create({
      title: 'GIF',
      inputs: [
        {
          name: 'profileURL',
          placeholder: 'GIF / Image Url'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'OK',
          handler: data => {
            if(data['profileURL']) {
              this.profileImage =  data['profileURL'];
            }
          }
        }
      ]
    });
    alert.present();
  }

  logout() {
    this.showLoading();
    this.authService.logout().subscribe(response => {
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
