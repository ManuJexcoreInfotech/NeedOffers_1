import { Component } from '@angular/core';
import { NavController, ToastController, AlertController, LoadingController } from 'ionic-angular';
import { Camera, CameraOptions} from '@ionic-native/camera';


import { TranslateService } from 'ng2-translate/ng2-translate';

//  import { MainPage } from '../../pages/pages';
//  import { UsersService } from '../../providers/users-service/users-service';
import { FirebaseProvider } from './../../providers/firebase/firebase';

import * as firebase from 'firebase';
import { HomePage } from '../home/home';

import { AngularFireDatabase } from 'angularfire2/database';

// import { FIREBASE_CONFIG } from "../src/app/FIREBASE_CONFIG";

import {DomSanitizer} from '@angular/platform-browser';

import { storage, initializeApp } from 'firebase';
import { FIREBASE_CONFIG } from '../../app/app.firebase.config';

import { LoginPage } from '../login/login';



@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})


export class SignupPage {
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  captureDataUrl: any;

  profilePicUploadStatus:any;

  public skills : string;
  public email : any;
  public phone : any;
  public password : any;
  public first_name : any;
  public last_name : any;
  public city : any;
  public state : any;
  public country : any;

  storageAvatarRef: any;
  profilAvatarRef: any;
  objectToSave: Array<any> = new Array;


  // Our translated text strings
  private signupErrorString: string;

  public photos : any;
  public base64Image : string;

  constructor(public navCtrl: NavController, 
              public loadingCtrl: LoadingController, public afDB: AngularFireDatabase,
              public toastCtrl: ToastController, public alertCtrl: AlertController,
              public translateService: TranslateService, private camera : Camera,
              public firebasedata: FirebaseProvider,public _DomSanitizer: DomSanitizer) {

        //  this.storageAvatarRef = firebase.storage().ref().child('userPicture/');//Firebase storage main path
        //  this.profilAvatarRef = afDB.object('TEST/avatar/');//Firebase user database avatar path

      // initializeApp(FIREBASE_CONFIG);

    this.translateService.get('SIGNUP_ERROR').subscribe((value) => {
      this.signupErrorString = value;
    })

  }



  ngOnInit() {
    this.photos = [];
  }

  async takePhoto() {

    try {
    const options : CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    const result = await this.camera.getPicture(options);

    const image = 'data:image/jpeg;base64,${result}';

    this.captureDataUrl = result;

    this.uploadImage();

    // const pictures = storage().ref('images');

    // pictures.putString(image, 'data_url');

  }
  catch (e) {
    console.error(e);
  }
      // .then((imageData) => {
      //   this.base64Image = "file://" + imageData;
      //   this.captureDataUrl = imageData;
        
      //   this.photos.push(this.base64Image);

      //   this.upload();
      // }, (err) => {
      //   console.log(err);
      // });
  }

  // uploadProfilPicture(imgData: any) {
  //   var randomNumber = Math.floor(Math.random() * 256);
  //   console.log('Random number : ' + randomNumber);

  //   this.storageAvatarRef.child(randomNumber + '.jpg').putString(imgData, 'base64', { contentType: 'image/jpeg' }).then((savedPicture) => {
  //     console.log('saved picture URL', savedPicture.downloadURL);

  //     this.objectToSave.push(savedPicture.downloadURL);
  //     console.log('objectToSave : ' + JSON.stringify(this.objectToSave));
  //     this.profilAvatarRef.set(this.objectToSave);
  //   });
  // }

  upload() {

    console.log("Uploading start.................");
    let storageRef = firebase.storage().ref();
    // Create a timestamp as filename
    const filename = Math.floor(Date.now() / 1000);

    // Create a reference to 'images/todays-date.jpg'
    const imageRef = storageRef.child(`images/${filename}.jpg`);

    imageRef.putString(this.captureDataUrl, firebase.storage.StringFormat.DATA_URL).then((snapshot)=> {
      // Do something here when the data is succesfully uploaded!
      this.showSuccesfulUploadAlert();

    });

  }

  showSuccesfulUploadAlert() {
    let alert = this.alertCtrl.create({
      title: 'Uploaded!',
      subTitle: 'Picture is uploaded to Firebase',
      buttons: ['OK']
    });
    alert.present();

    // clear the previous photo data in the variable
   // this.captureDataUrl = "";
  }


doSignup() {
  //   signup process only    //
var account = {
      first_name: this.first_name,
      last_name: this.last_name || '',
      skills: this.skills || '',
      email: this.email,
      phone: this.phone || '',
      password: this.password,
      city: this.city || '',
      state: this.state || '',
      country: this.country || ''

    };

 window.localStorage.setItem("first_name",this.first_name);  
 window.localStorage.setItem("last_name",this.last_name);  
 window.localStorage.setItem("city_name",this.city);  
 window.localStorage.setItem("country_name",this.country);   

var that = this;

var loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 3000
    });
    loader.present();

console.log(account);

  	this.firebasedata.register(account).then(authData => {
  		//successful
  		loader.dismiss();
  		that.navCtrl.setRoot(LoginPage);  //MainPage

  	}, error => {
     loader.dismiss();
     // Unable to log in
      let toast = this.toastCtrl.create({
        message: error,
        duration: 3000,
        position: 'top'
      });
      toast.present();

that.password = ""//empty the password field

  	});

    
  }

  deletePhoto(index) {
    let confirm = this
      .alertCtrl
      .create({
        title: 'Sure you want to delete this photo? There is NO undo!',
        message: '',
        buttons: [
          {
            text: 'No',
            handler: () => {
              console.log('Disagree clicked');
            }
          }, {
            text: 'Yes',
            handler: () => {
              console.log('Agree clicked');
              this
                .photos
                .splice(index, 1);
              //return true;
            }
          }
        ]
      });
    confirm.present();
  }  //  end of deletePhoto function.


  uploadImage() {
    
    let storageRef = firebase.storage().ref();
    
    var uploadTask = storageRef.child('images').putString(this.captureDataUrl, firebase.storage.StringFormat.DATA_URL);
    // Listen for state changes, errors, and completion of the upload.
    
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
    (snapshot) => {
      console.log("snapshot value is = ", snapshot);
    }, (error)=> {
      console.log("Error",error);
    }, ()=> {
    // Upload completed successfully, now we can get the download URL
    var downloadURL = uploadTask.snapshot.downloadURL;
    console.log("downloadURL: ",downloadURL);
    
    });

    }


}
