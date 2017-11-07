import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule} from '@angular/http';
import { LocalStorageModule } from 'angular-2-local-storage';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { MyApp } from './app.component';

import { AddFriendsPage } from '../pages/friends/add-friends';

import { AuthService } from '../providers/services/auth-service/auth-service';
import { AuthAPIService } from '../providers/services/auth-service/auth-api-service';
import { UserService } from '../providers/services/user-service/user-service';
import { UserAPIService } from '../providers/services/user-service/user-api-service';

@NgModule({
  declarations: [
    MyApp,
    AddFriendsPage,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    LocalStorageModule.withConfig({
      prefix: 'my-app',
      storageType: 'localStorage'
    }),
    BrowserAnimationsModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AddFriendsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthService,
    AuthAPIService,
    UserService,
    UserAPIService
  ]
})
export class AppModule {}
