import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { ItemListUserComponent } from './item-list-user';

@NgModule({
  declarations: [
    ItemListUserComponent,
  ],
  imports: [
    IonicModule,
  ],
  exports: [
    ItemListUserComponent
  ]
})
export class ItemListUserComponentModule {}
