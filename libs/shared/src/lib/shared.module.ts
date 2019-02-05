import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatCardModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatToolbarModule
} from '@angular/material';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';

const SharedModules = [
  CommonModule,
  RouterModule,
  MatToolbarModule,
  MatButtonModule,
  MatIconModule,
  MatGridListModule,
  MatCardModule,
  MatInputModule,
  FlexLayoutModule,
  FormsModule,
  ReactiveFormsModule
];


@NgModule({
  imports: [SharedModules],
  exports: [SharedModules, HomeComponent],
  declarations: [HomeComponent]
})
export class SharedModule {
}
