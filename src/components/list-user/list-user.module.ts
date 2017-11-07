import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { ListUserComponent } from './list-user';

@NgModule({
  declarations: [
    ListUserComponent,
  ],
  imports: [
    IonicModule,
  ],
  exports: [
    ListUserComponent
  ]
})
export class ListUserComponentModule {}
