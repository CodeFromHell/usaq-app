import { FormGroup } from '@angular/forms';

export class ValidatorUtils {
  public static REGEX_ALPHANUMERIC =  '[a-zA-Z0-9]*$';
  public static MIN_SIZE_PASSWORD  = 4;


  static isPasswowrdMatching(group: FormGroup){
    var firstPassword = group.controls['password'].value;
    var secondPassword = group.controls['password_repeat'].value;
    if((firstPassword && secondPassword) && (firstPassword != secondPassword)){
      group.controls['password_repeat'].setErrors({"password_match": true});
      return { "password_match": true };
    } else{
      return null;
    }

  }
}
