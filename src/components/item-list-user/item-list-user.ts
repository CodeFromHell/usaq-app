import { Component } from '@angular/core';

/**
 * Generated class for the ItemListUserComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'item-list-user',
  templateUrl: 'item-list-user.html'
})
export class ItemListUserComponent {

  text: string;

  constructor() {
    console.log('Hello ItemListUserComponent Component');
    this.text = 'Hello World';
  }

}
