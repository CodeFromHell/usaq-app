import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomePage } from './home';
import { ListFriendComponent } from '../../components/list-friend/list-friend';
import { ItemListFriendComponent } from '../../components/item-list-friend/item-list-friend';
@NgModule({
  declarations: [
    HomePage,
    ListFriendComponent,
    ItemListFriendComponent
  ],
  imports: [
    IonicPageModule.forChild(HomePage),
  ],
  exports: [
    HomePage
  ],


})
export class HomePageModule {}
