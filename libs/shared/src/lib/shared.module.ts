import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatToolbarModule } from '@angular/material';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [CommonModule, RouterModule, MatToolbarModule, FlexLayoutModule],
  exports: [CommonModule, RouterModule, MatToolbarModule, FlexLayoutModule]
})
export class SharedModule {
}
