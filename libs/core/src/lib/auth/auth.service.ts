import { Injectable } from '@angular/core';
import { AngularFireAuth, } from '@angular/fire/auth';
import { Router } from '@angular/router';
import * as firebase from "firebase";
import { User } from "firebase";
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<User>;

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth) {
    this.user$ = this.afAuth.authState;
  }

  login() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(() => this.router.navigate(["draws"]))
      .catch(() => this.router.navigate(["home"]));
  }

  logout() {
    this.afAuth.auth.signOut();
    this.router.navigate(["home"]);
  }


}
