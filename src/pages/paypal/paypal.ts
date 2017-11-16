import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal';
import {Config} from '../../config';

@Component({
  selector: 'page-paypal',
  templateUrl: 'paypal.html',
})
export class PaypalPage {
  
  payment : PayPalPayment = new PayPalPayment('19.99', 'USD', 'Subscription Charge', 'Monthly');
  currencies = ['POUND', 'USD'];
  payPalEnvironment : string = 'payPalEnvironmentSandbox';

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              private payPal : PayPal) {
                
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PaypalPage is loaded.');
  }

  makePayment() {
    this
      .payPal
      .init({PayPalEnvironmentProduction: Config.payPalEnvironmentProduction, PayPalEnvironmentSandbox: Config.payPalEnvironmentSandbox})
      .then(() => {
        this
          .payPal
          .prepareToRender(this.payPalEnvironment, new PayPalConfiguration({}))
          .then(() => {
            this
              .payPal
              .renderSinglePaymentUI(this.payment)
              .then((response) => {
                alert(`Satisfactory payment State = ${response.response.state}`);
                console.log(response);
              }, () => {
                  console.log('Error or closed rendering dialog unsuccessful');
              });
          }, () => {
              console.log('Configuration error');
          });
      }, () => {
          console.log('Initialization failed, maybe PayPal is not compatible.');
      });
  }  

}
