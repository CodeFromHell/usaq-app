import { Component, trigger, state, style, transition, animate } from '@angular/core';
import { NavController, AlertController, IonicPage } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/services/auth-service/auth-service';
import { FormBuilder, FormGroup, Validators , AbstractControl } from '@angular/forms';
import { ValidatorUtils } from '../../utils/validatorUtils'
import { User } from '../../model/entity/User';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
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
    //Register button
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

export class RegisterPage {
  createSuccess = false;
  registerCredentials : User;
  registerPageForm: FormGroup;
  password_repeat: AbstractControl;

  /*State animations*/
  logoState: any = "in";
  buttonRegisterState : any = "in";
  formInputState : any = "in";

  constructor(private nav: NavController, private auth: AuthServiceProvider,
    private alertCtrl: AlertController , public formBuilder: FormBuilder) {
      this.init();
    }

    public init() {
      this.registerCredentials = new User('', '', '');
      this.registerPageForm = this.formBuilder.group({
        username: ['', Validators.compose([Validators.pattern(ValidatorUtils.REGEX_ALPHANUMERIC), Validators.required])],
        password: ['', Validators.compose([Validators.minLength(ValidatorUtils.MIN_SIZE_PASSWORD), Validators.required])],
        password_repeat: ['', Validators.compose([Validators.minLength(ValidatorUtils.MIN_SIZE_PASSWORD), Validators.required])]
      }, { 'validator': ValidatorUtils.isPasswordMatching });
      this.password_repeat = this.registerPageForm.controls['password_repeat'];
  }

  public register() {
    this.auth.register(this.registerCredentials).subscribe(success => {
      if (success) {
        this.createSuccess = true;
        this.showPopup("Success", "Account created.");
      } else {
        this.showPopup("Error", "Problem creating account.");
      }
    },
    error => {
      this.showPopup("Error", error);
    });
  }

  public goToLogin(){
      this.nav.push('LoginPage');
  }

  showPopup(title, text) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons: [
        {
          text: 'OK',
          handler: data => {
            if (this.createSuccess) {
              this.nav.setRoot('HomePage');
              this.nav.popToRoot();
            }
          }
        }
      ]
    });
    alert.present();
  }
}
