import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {

  constructor(private auth: AngularFireAuth) { }
  login(email:string, password:string){
    return new Promise((resolve , reject)=>{
      this.auth.auth.signInWithEmailAndPassword(email,password)
    .then(userData => resolve(userData),err => reject(err))
    });
  }

  getAuth(){
    return this.auth.authState.map(auth=> auth);
  }

  logout(){
    return this.auth.auth.signOut();
  }

  register(email:string,password:string){
    return new Promise((resolve, reject) => {
      this.auth.auth.createUserWithEmailAndPassword(email,password)
      .then(userData => resolve(userData),err=> reject(err))
    });
  }
}
