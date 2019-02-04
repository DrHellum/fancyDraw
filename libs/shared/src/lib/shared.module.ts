import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule, MatToolbarModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';

@NgModule({
  imports: [CommonModule, RouterModule, MatToolbarModule, MatButtonModule, FlexLayoutModule],
  exports: [CommonModule, RouterModule, MatToolbarModule, MatButtonModule, FlexLayoutModule, HomeComponent],
  declarations: [HomeComponent]
})
export class SharedModule {
}
