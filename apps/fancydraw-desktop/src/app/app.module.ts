import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
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
  imports: [BrowserModule, NxModule.forRoot()],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
