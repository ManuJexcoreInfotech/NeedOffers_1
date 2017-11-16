
import { Injectable } from '@angular/core';

//import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import firebase from 'firebase/app';

import { AngularFireAuth } from "angularfire2/auth";
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
// import { NavController } from "ionic-angular";

import { Camera } from '@ionic-native/Camera';

@Injectable()
export class FirebaseProvider {

  loader:any;
  postedBy:any;

  postsNode:any;

  constructor(private afAuth: AngularFireAuth, public afd: AngularFireDatabase) {
    console.log('Hello FirebaseProvider Provider');

    this.postsNode = firebase.database().ref('posted_data');
  }


  // saveStudentDetails(firstName: string, lastName: string, schoolName: string, grade: any, email: any, phone: any):any {
  //     return firebase.database().ref('students').push({firstName: firstName,
  //                                                       lastName: lastName,
  //                                                       schoolName: schoolName,
  //                                                       grade: grade,
  //                                                       email: email,
  //                                                       phone: phone
  //                                                    });
  // }

  // saveLoginDetails(userName: string, password: any): any {
  //   return firebase.database().ref('loginDetails').push({userName: userName,
  //                                                         password: password});
  // }

    async register(account: {}) {
    try {
     
      const result = await this.afAuth.auth.createUserWithEmailAndPassword( account['email'], account['password']);
      console.log(result);
      return result;

    }
    catch (e) {
      console.error(e);
    }
    
  }  //  end of register function

    async login(email:any, password:any) {
    try {
      const result = await this.afAuth.auth.signInWithEmailAndPassword(email,password);
      // if (result) {
      //   alert('success');
      // }  

      return result;

      // console.log(result);
    }
    catch (e) {
      
      console.error(e);
      console.log(e.code);
      console.log(e.message);
      // return e;
    }
  }

  async postdata(name: string, surname: string, title: string, detail: string, city: string, country: string, postby: string) {

    this.postedBy = window.localStorage.getItem("UserName");

    return firebase.database().ref('posted_data').push({ Name: name, Lastname: surname, Title: title,
                     Data: detail, City: city, Country: country, PostByID: postby});

}

getcards() {
    return this.afd.list('/posted_data').valueChanges();
}

  getShoppingItems() {
    return this.afd.list('/shoppingItems/').valueChanges();
  }
 
  addItem(name) {
    this.afd.list('/shoppingItems/').push(name);
  }
 
  removeItem(id) {
    this.afd.list('/shoppingItems/').remove(id);
  }

  query(params?: any) {
    if(!params) {
      return this.postsNode;
    }

    return this.postsNode.filter((item) => {
      for(let key in params) {
        let field = item[key];
        if(typeof field == 'string' && field.toLowerCase().indexOf(params[key].toLowerCase()) >= 0) {
          return item;
        } else if(field == params[key]) {
          return item;
        }
      }
      return null;
    });
  }


  // logout() {

  //   logout(): firebase.Promise<any> {
  //       return this.afAuth.auth.signOut();
  // }

}