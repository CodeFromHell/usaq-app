import { Component } from '@angular/core';

/**
 * Generated class for the ListUserComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'list-user',
  templateUrl: 'list-user.html'
})
export class ListUserComponent {

  text: string;

  constructor() {
    console.log('Hello ListUserComponent Component');
    this.text = 'Hello World';
  }

}
