import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AuthGuard, CoreModule } from '@fancydraw/core';
import { DataAccessModule } from '@fancydraw/data-access';
import { HomeComponent } from '@fancydraw/shared';
import { ShellModule } from '@fancydraw/shell';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
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
    CoreModule,
    BrowserModule,
    NxModule.forRoot(),
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument(),
    DataAccessModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    RouterModule.forRoot([
      {path: '', pathMatch: 'full', redirectTo: "draws"},
      {path: 'home', pathMatch: 'full', component: HomeComponent},
      {path: 'draws', loadChildren: "@fancydraw/draw#DrawModule", canActivate: [AuthGuard]}
    ]),
    ShellModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
