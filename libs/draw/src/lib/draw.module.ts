import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@fancydraw/shared';
import { DrawListComponent } from './draw-list/draw-list.component';
import { DrawDetailsComponent } from './draw-details/draw-details.component';
import { RaffleComponent } from './raffle/raffle.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {path: '', pathMatch: 'full', component: DrawListComponent, data: {animation: 'List'}},
      {path: ':drawId/details', component: DrawDetailsComponent, data: {animation: 'Detail'}},
      {path: ':drawId/raffle', component: RaffleComponent, data: {animation: 'Detail'}}
    ])
  ],
  declarations: [DrawListComponent, DrawDetailsComponent, RaffleComponent]
})
export class DrawModule {
}
