import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { SigninPage } from '../signin/signin';
import { AngularFireAuth } from 'angularfire2/auth';
import { TutorialPage } from '../tutorial/tutorial';

// @Component({
//   selector: 'page-popover',
//   templateUrl: 'popover.html',
// })
declare var Window:any;

@Component({
  selector: 'page-popover',
  template: `
    <ion-list>
      <ion-list-header>My App 1.0.0</ion-list-header>
      <button ion-item (click)="close()">Logout</button>
    </ion-list>
  `
})

export class PopoverPage {

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public viewCtrl: ViewController,
              public afAuth: AngularFireAuth) {
  }

  close() {
    this.afAuth.auth.signOut();
    console.log("Logout me.......");
    this.viewCtrl.dismiss();
    window.localStorage.clear();
    this.navCtrl.setRoot(TutorialPage);   //   SigninPage
    //this.viewCtrl.dismiss();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PopoverPage');
  }

}
