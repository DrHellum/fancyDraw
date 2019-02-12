import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@fancydraw/shared';
import { DrawListComponent } from './draw-list/draw-list.component';
import { DrawDetailsComponent } from './draw-details/draw-details.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {path: '', pathMatch: 'full', component: DrawListComponent},
      {path: ':drawId/details', component: DrawDetailsComponent }
    ])
  ],
  declarations: [DrawListComponent, DrawDetailsComponent]
})
export class DrawModule {
}
