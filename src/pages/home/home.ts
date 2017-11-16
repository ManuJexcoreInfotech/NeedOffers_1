import { Component } from '@angular/core';
import { NavController,PopoverController, ViewController } from 'ionic-angular';

import { FirebaseProvider } from './../../providers/firebase/firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { SigninPage } from "../signin/signin";
import { Observable } from 'rxjs/Observable';
import { PopoverPage } from '../popover/popover';

import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  cards:Observable<any[]>;

  currentItems: any = [];
  paypal:any;

  shoppingItems: Observable<any[]>;
  newItem = '';
  searchQuery = '';

  avatarPath:any;

  public skillRef:firebase.database.Reference;
  public skillList:Array<any>;
  public loadedSkillList:Array<any>;

  constructor(public navCtrl: NavController,
              public afAuth: AngularFireAuth,
              public firebaseData: FirebaseProvider,
              public popoverCtrl: PopoverController,
              public afDB: AngularFireDatabase,private payPal: PayPal) {              
             
                this.avatarPath = "https://ionicframework.com/dist/preview-app/www/assets/img/marty-avatar.png";
              //   this.shoppingItems = this.firebaseData.getShoppingItems();
                 this.getcards();

                 this.skillRef = firebase.database().ref('/posted_data');

                 this.skillRef.on('value', skillList => {
                  let countries = [];
                  
                  skillList.forEach( list => {
                    countries.push(list.val());
                    return false;
                  });
            
                  this.skillList = countries;
                  this.loadedSkillList = countries;
                  console.log("skill list is = ",this.skillList);
                  console.log("loaded skill list = ",this.loadedSkillList);
                });
  
  
  
this.payPal.init({
  PayPalEnvironmentProduction: '',
  PayPalEnvironmentSandbox: 'AXg409-ZD7lFcgk2JdHkLkggX8u7LnT7cfkGL2AG0y7bx5OAvOmErpKKz5D68kzXRxbfe_KRlFf681rk'
}).then(() => {
  // Environments: PayPalEnvironmentNoNetwork, PayPalEnvironmentSandbox, PayPalEnvironmentProduction
  this.payPal.prepareToRender('PayPalEnvironmentSandbox', new PayPalConfiguration({
    // Only needed if you get an "Internal Service Error" after PayPal login!
    //payPalShippingAddressOption: 2 // PayPalShippingAddressOptionPayPal
  })).then(() => {
    let payment = new PayPalPayment('3.33', 'USD', 'Description', 'sale');
    this.payPal.renderSinglePaymentUI(payment).then(() => {
      // Successfully paid
        alert("Paypal payment success ?");
      // Example sandbox response
      //
      // {
      //   "client": {
      //     "environment": "sandbox",
      //     "product_name": "PayPal iOS SDK",
      //     "paypal_sdk_version": "2.16.0",
      //     "platform": "iOS"
      //   },
      //   "response_type": "payment",
      //   "response": {
      //     "id": "PAY-1AB23456CD789012EF34GHIJ",
      //     "state": "approved",
      //     "create_time": "2016-10-03T13:33:33Z",
      //     "intent": "sale"
      //   }
      // }
    }, () => {
      // Error or render dialog closed without being successful
    });
  }, () => {
    // Error in configuration
  });
}, () => {
  // Error in initialization, maybe PayPal isn't supported or something else
});
  
  
  
}   // end of home pahe constructor function.

  initializeItems() {
    this.skillList = this.loadedSkillList;
    console.log("skill list is = ",this.skillList);

  }

  
  getItems(searchbar) {
    // Reset items back to all of the items
    console.log("Search terms are = ", searchbar);
    this.initializeItems();
    
    // set q to the value of the searchbar
    var q = searchbar.srcElement.value;
    console.log("Q is = ", q);


    // if the value is an empty string don't filter the items
    if (!q) {
      return;
    }

    this.skillList = this.skillList.filter((v) => {
      if(v.Title && q) {
        console.log("v is = ", v.Title);
        if (v.Title.toLowerCase().indexOf(q.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }
    });

  //  console.log(q, this.skillList.length);

  }
  

  addItem() {
    this.firebaseData.addItem(this.newItem);
    this.newItem = '';
  }
 
  removeItem(id) {
    this.firebaseData.removeItem(id);
  }  

  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopoverPage);
    popover.present({
      ev: myEvent
    });
  }

getcards() {
  this.cards = this.firebaseData.getcards(); 
  //    step one
    // this.cards = this.afDB.list<Item>('posted_data').valueChanges();   
    //    this.firebaseData.getcards(); 
    console.log("cards are = ", this.cards);
}

searchItem(ev) {

  // let val = ev;
  // if(!val || !val.trim()) {
  //   this.cards;
  //   return;
  // }
  // this.cards = this.firebaseData.query({
  //   Title: val
  // });
  console.log("search value is = ", ev);
}

suggestItem(ev) {
  console.log("suggest value is = ", ev);
}

onCancel(ev: any) {
    this.searchQuery = '';
}


}   // end of class.

