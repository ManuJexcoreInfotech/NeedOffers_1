import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { RegistrationPage } from "../pages/registration/registration";
import { SigninPage } from "../pages/signin/signin";
import { TutorialPage } from '../pages/tutorial/tutorial';
import { PaypalPage } from '../pages/paypal/paypal';


// import firebase from 'firebase';
declare var window:any;

@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, 
              public statusBar: StatusBar, 
              public splashScreen: SplashScreen) {

     if (window.localStorage.getItem("UserID")) {
        this.rootPage = HomePage;
      } else {
        this.rootPage = TutorialPage;      // SigninPage
      }

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Post Project', component: ListPage },
      { title: 'Make Payment', component: PaypalPage }
    ];

  }  // end of constructer function.

  initializeApp() {

    this.platform.ready().then(() => {

      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();

    });        
    

  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
