import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@fancydraw/shared';
import { DrawListComponent } from './draw-list/draw-list.component';
import { DrawEditComponent } from './draw-edit/draw-edit.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {path: '', pathMatch: 'full', component: DrawListComponent}
    ])
  ],
  declarations: [DrawListComponent, DrawEditComponent]
})
export class DrawModule {
}
