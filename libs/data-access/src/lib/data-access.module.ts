import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { DrawEffects } from './state+/draw.effects';
import * as fromDraw from './state+/draw.reducer';


@NgModule({
  imports: [
    CommonModule,
    AngularFirestoreModule,
    StoreModule.forFeature('draw', fromDraw.reducer),
    EffectsModule.forFeature([DrawEffects])
  ]
})
export class DataAccessModule {
}
