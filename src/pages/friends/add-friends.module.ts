import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddFriendsPage } from './add-friends';

@NgModule({
  declarations: [
    AddFriendsPage,
  ],
  imports: [
    IonicPageModule.forChild(AddFriendsPage),
  ],
  exports: [
    AddFriendsPage
  ]
})
export class AddFriendsPageModule {}
