import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { FIREBASE_CONFIG } from "./app.firebase.config";

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { FirebaseProvider } from '../providers/firebase/firebase';
import { RegistrationPage } from "../pages/registration/registration";
import { SigninPage } from "../pages/signin/signin";

import { Http } from '@angular/http';
import { HttpModule } from '@angular/http';

import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal';


import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuthModule }from 'angularfire2/auth'; 
import { PopoverPage } from '../pages/popover/popover';

import { Geolocation } from '@ionic-native/geolocation';
import { WelcomePage } from '../pages/welcome/welcome';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { TutorialPage } from '../pages/tutorial/tutorial';

import { TranslateModule, TranslateLoader, TranslateStaticLoader, TranslateService, TranslatePipe } from 'ng2-translate/ng2-translate';
import { Camera } from '@ionic-native/camera';
import { PaypalPage } from '../pages/paypal/paypal';

// The translate loader needs to know where to load i18n files
// in Ionic's static asset pipeline.
export function createTranslateLoader(http: Http) {
  return new TranslateStaticLoader(http, './assets/i18n', '.json');
}


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    RegistrationPage,
    SigninPage,
    PopoverPage,
    WelcomePage,
    LoginPage,
    SignupPage,
    TutorialPage,
    PaypalPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps: [Http]
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    RegistrationPage,
    SigninPage,
    PopoverPage,
    WelcomePage,
    LoginPage,
    SignupPage,
    TutorialPage,
    PaypalPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    FirebaseProvider,AngularFireDatabase,Camera,Geolocation,PayPal,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})

export class AppModule {}
