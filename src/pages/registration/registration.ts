
import { NavController, NavParams, Platform } from 'ionic-angular';
import { Component } from '@angular/core';

//import {FirebaseListObservable} from 'angularfire2/database';
//import { AngularFireDatabase } from 'angularfire2/database';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseProvider } from './../../providers/firebase/firebase';
import { LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

import { User } from "../../models/user";
import { AngularFireAuth } from "angularfire2/auth";
import { Geolocation } from '@ionic-native/geolocation';


@Component({
  selector: 'page-registration',
  templateUrl: 'registration.html',
})

export class RegistrationPage {

public registrationForm:FormGroup;
 
// user = {} as User;

user:any = '';
location:any;
lat:any;
long:any;

constructor(public navCtrl: NavController, 
            public formBuilder: FormBuilder, 
            public firebaseData: FirebaseProvider, 
            public loadingCtrl: LoadingController, 
            public alertCtrl: AlertController,
            private afAuth: AngularFireAuth,
            private geolocation: Geolocation,
            public platform: Platform) {

      this.registrationForm = formBuilder.group({
        'firstName': ['', Validators.compose([Validators.required])],
        'lastName': ['', Validators.compose([Validators.required])],
        'email': ['', Validators.compose([Validators.required])],
        'password': ['', Validators.compose([Validators.required])]

      });      
     
    if(platform.is('android')) {   //  to check and call method only if
      this.Get_location();         // valid os is deteted. 
    }

  }

  Get_location(): void {
    this.location.getCurrentPosition().then((resp) => {
      this.lat = resp.coords.latitude;
      this.long = resp.coords.longitude;
      
      console.log("latitude value is = ", this.lat);
      console.log("longitude value is = ", this.long);

     }).catch((error) => {
       console.log('Error getting location', error);
     });
  }

  registerStudent() {
     let loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    loader.present();
  
    window.localStorage.setItem("UserName",this.registrationForm.value.firstName);

    //   this.firebaseData.register(this.registrationForm.value.firstName, 
    //                             this.registrationForm.value.lastName, 
    //                             this.registrationForm.value.email,
    //                             this.registrationForm.value.password).then((data) => {
                                
    //                               this.registrationForm.reset();
      
    //   console.log("*******  data  ********");
    //   console.log(JSON.stringify(data));

    //   if(data) {
    //   let alert = this.alertCtrl.create({
    //   title: 'Registration Successful!',
    //   subTitle: 'you have been registered successfully!',
    //   buttons: ['OK']
    // });
    // alert.present();

    //     loader.dismiss();
    //   } else {
    //     loader.dismiss();
    //     console.log("error");
    //   }                                       
    
    
    //  });

  }   //end of registerStudent function

ionViewWillEnter() {

  console.log('Registration page loaded.');
}

}
