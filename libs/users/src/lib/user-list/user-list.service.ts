import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserListService {
  users$: Observable<any>;

  constructor(private fireStore: AngularFirestore) {
    this.users$ = fireStore.collection("users").valueChanges();
  }
}
