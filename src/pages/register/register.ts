import { Component } from '@angular/core';
import { NavController, AlertController, IonicPage } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorUtils } from '../../utils/validatorUtils'
import { User } from '../../model/entity/User';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {
  createSuccess = false;
  registerCredentials : User;
  registerPageForm: FormGroup;

  constructor(private nav: NavController, private auth: AuthServiceProvider,
    private alertCtrl: AlertController , public formBuilder: FormBuilder) {
      this.init();
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

    public init() {
      this.registerCredentials = new User('', '');
      this.registerPageForm = this.formBuilder.group({
        username: ['', Validators.compose([Validators.pattern(ValidatorUtils.REGEX_ALPHANUMERIC), Validators.required])],
        password: ['', Validators.compose([Validators.minLength(ValidatorUtils.MIN_SIZE_PASSWORD), Validators.required])]
      });
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
                this.nav.popToRoot();
              }
            }
          }
        ]
      });
      alert.present();
    }
  }
