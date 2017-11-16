import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseProvider } from './../../providers/firebase/firebase';

declare var window: any;

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  // selectedItem: any;
  // icons: string[];
  // items: Array<{title: string, note: string, icon: string}>;

  firstname:any;
  lastname:any;
  cityname:any;
  countryname:any;

  postedBy:any;

  public postForm: FormGroup;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public formBuilder: FormBuilder, 
              public firebaseData: FirebaseProvider,
              public loadingCtrl: LoadingController ) {



    this.postForm = formBuilder.group({
      'title': ['', Validators.compose([Validators.required])],
      'detail': ['', Validators.compose([Validators.required])]
    });

  }

  postData() {
    let loader = this.loadingCtrl.create({
     content: "Please wait..."
   });
   loader.present();

   this.firebaseData.postdata(this.firstname,this.lastname,this.postForm.value.title, 
                              this.postForm.value.detail,this.cityname, 
                              this.countryname,this.postedBy).then((data) => {
      
      loader.dismiss();
      this.postForm.reset();

     console.log("*******  data  saved  ********");
     console.log(JSON.stringify(data));
                       
});


}   //  end of post data  

ionViewWillEnter() {

  this.firstname = window.localStorage.getItem("first_name");  
  this.lastname =  window.localStorage.getItem("last_name");  
  this.cityname = window.localStorage.getItem("city_name");  
  this.countryname = window.localStorage.getItem("country_name"); 
  this.postedBy = window.localStorage.getItem('UserID');

}


}
