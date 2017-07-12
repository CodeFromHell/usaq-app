import { Component, trigger, state, style, transition, animate } from '@angular/core';
import { NavController, AlertController, LoadingController, Loading, IonicPage } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/services/auth-service/auth-service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorUtils } from '../../utils/validatorUtils'
import { User } from '../../model/entity/User';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  animations: [
    //Title img
    trigger('fadeIn', [
      state('in', style({
        opacity: 1
      })),
      transition('void => *', [
        style({opacity: 0}),
        animate('0ms 1000ms ease-in')
      ])
    ]),
    //Form inputs
    trigger('fadeIn', [
      state('in', style({
        opacity: 1
      })),
      transition('void => *', [
        style({opacity: 0}),
        animate('1000ms 2000ms ease-in')
      ])
    ]),
    //Login button
    trigger('fadeIn', [
      state('in', style({
        opacity: 1
      })),
      transition('void => *', [
        style({opacity: 0}),
        animate('1000ms 2000ms ease-in')
      ])
    ])
  ]
})

export class LoginPage {
  loading: Loading;
  registerCredentials: User;
  loginPageForm: FormGroup;

  /*State animations*/
  logoState: any = "in";
  buttonLoginState : any = "in";
  formInputState : any = "in";

  constructor(private nav: NavController, private auth: AuthServiceProvider,
    private alertCtrl: AlertController, private loadingCtrl: LoadingController,
    public formBuilder: FormBuilder) {
      this.init();
    }

    public init() {
      this.registerCredentials = new User('', '');
      this.loginPageForm = this.formBuilder.group({
        username: ['', Validators.compose([Validators.pattern(ValidatorUtils.REGEX_ALPHANUMERIC), Validators.required])],
        password: ['', Validators.compose([Validators.minLength(ValidatorUtils.MIN_SIZE_PASSWORD), Validators.required])]
      });
    }

    public createAccount() {
      this.nav.push('RegisterPage');
    }

    public login() {
      this.showLoading();
      this.auth.login(this.registerCredentials).subscribe(response => {
        if (response === true) {
          this.loading.dismiss();
          this.nav.setRoot('HomePage');
        } else {
          this.showError(response.json()['detail']);
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
