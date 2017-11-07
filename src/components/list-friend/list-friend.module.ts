import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { ListFriendComponent } from './list-friend';
import { ItemListFriendComponent } from '../item-list-friend/item-list-friend';

@NgModule({
  declarations: [
    ListFriendComponent,
    ItemListFriendComponent
  ],
  imports: [
    IonicModule
  ],
  exports: [
    ListFriendComponent
  ]
})
export class ListFriendComponentModule {}
