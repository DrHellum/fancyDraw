import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { ShellModule } from '@fancydraw/shell';
import { NxModule } from '@nrwl/nx';

import { AppComponent } from './app.component';

// Initialize Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyAkeS29tboKaEU-rQAdHyhahPz07KjCtkY',
  authDomain: 'fancydraw-9c765.firebaseapp.com',
  databaseURL: 'https://fancydraw-9c765.firebaseio.com',
  projectId: 'fancydraw-9c765',
  storageBucket: 'fancydraw-9c765.appspot.com',
  messagingSenderId: '939696490241'
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    NxModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([
      { path: '', pathMatch: 'full', redirectTo: "users" },
      { path: 'users', loadChildren: "@fancydraw/users#UsersModule" }
    ]),
    ShellModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
