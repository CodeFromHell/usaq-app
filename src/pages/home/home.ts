import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, Loading, IonicPage } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/services/auth-service/auth-service';
import { LocalStorageService } from 'angular-2-local-storage';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  loading: Loading;

  constructor(private nav: NavController, private auth: AuthServiceProvider,
    private alertCtrl: AlertController, private loadingCtrl: LoadingController,
    private localStorageService: LocalStorageService) {
    }

    ngOnInit(): void {

    }

    logout() {
      this.showLoading();
      this.auth.logout().subscribe(allowed => {
        if (allowed) {
          this.localStorageService.clearAll();
          this.loading.dismiss();
          this.nav.setRoot('LoginPage');
        } else {
          this.showError('Logout failed');
        }
      },
      error => {
        this.showError(error);
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
