import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseProvider } from './../../providers/firebase/firebase';
import { LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { RegistrationPage } from "../registration/registration";
import { HomePage } from "../home/home";

// @IonicPage()


@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})


export class SigninPage {

public loginForm:FormGroup;

  constructor(public navCtrl: NavController, 
              public formBuilder: FormBuilder, 
              public firebaseData: FirebaseProvider, 
              public loadingCtrl: LoadingController, 
              public alertCtrl: AlertController) {
        
      this.loginForm = formBuilder.group({
        'email':['', Validators.compose([Validators.required])],
        'password': ['', Validators.compose([Validators.required])]                
      });
  }

  login() {

   let loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    loader.present();

    this.firebaseData.login(this.loginForm.value.email, 
                            this.loginForm.value.password).then((data) => {
      this.loginForm.reset();
      loader.dismiss();
      console.log("*******  data  ********");
      console.log(JSON.stringify(data));

      if(data.uid) {
        window.localStorage.setItem("UserID",data.uid);
        window.localStorage.setItem("UserEmail",data.email);

        // loader.dismiss();
        setTimeout(() => {
          this.navCtrl.setRoot(HomePage);
        },200);
       
      } else if(data.code =="auth/user-not-found") {
        loader.dismiss();
      } else {
        loader.dismiss();
      }

    });
    
    //  let alert = this.alertCtrl.create({
    //   title: 'Login Successful!',
    //   subTitle: 'Login is successful.',
    //   buttons: ['OK']
    // });
    // alert.present();

  }

  goto() {
    this.navCtrl.push(RegistrationPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SigninPage');
  }

}
