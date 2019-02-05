import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from '@fancydraw/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { User } from 'firebase';
import { combineLatest, from, Observable } from 'rxjs';
import { map, mergeMap, switchMap } from 'rxjs/operators';
import {
  AddDraw,
  DrawActionTypes,
  DrawAdded,
  DrawModified,
  DrawRemoved,
  UpdateDraw,
  UpdateSuccess
} from './draw.actions';
import { Draw } from './draw.model';

@Injectable()
export class DrawEffects {
  @Effect()
  query$: Observable<Action> = combineLatest(
    this.actions$.pipe(ofType(DrawActionTypes.LoadDraws)),
    this.auth.user$)
    .pipe(
      switchMap(([action, user]) => {
        console.log(action);
        return this.afs.collection(`users/${user.uid}/draws`)
          .stateChanges()
      }),
      mergeMap(actions => actions),
      map(fireStoreAction => {
          console.log(fireStoreAction);

          switch (fireStoreAction.type) {
            case 'added': {
              return new DrawAdded({
                ...fireStoreAction.payload.doc.data(),
                id: fireStoreAction.payload.doc.id
              } as Draw);
            }
            case 'modified':
              return new DrawModified({
                ...fireStoreAction.payload.doc.data(),
                id: fireStoreAction.payload.doc.id
              } as Draw);
            case 'removed':
              return new DrawRemoved({
                ...fireStoreAction.payload.doc.data(),
                id: fireStoreAction.payload.doc.id
              } as Draw);
          }
        }
      )
    );


  @Effect()
  update$: Observable<Action> = combineLatest(
    this.actions$.pipe(ofType(DrawActionTypes.UpdateDraw)),
    this.auth.user$)
    .pipe(
      switchMap(([action, user]: [UpdateDraw, User]) => {
        const ref = this.afs.doc<Draw>(`users/${user.uid}/draws/${action.payload.draw.id}`);
        return from(ref.update(action.payload.draw.changes));
      }),
      map(() => new UpdateSuccess())
    );

  @Effect()
  add$: Observable<Action> = this.auth.user$
    .pipe(
      switchMap(user => this.actions$
        .pipe(
          ofType(DrawActionTypes.AddDraw),
          switchMap((action: AddDraw) => {
            const ref = this.afs.collection<Draw>(`users/${user.uid}/draws`);
            return from(ref.add(action.payload.draw));
          }),
          map(() => new UpdateSuccess())
        )
      ));

  constructor(private actions$: Actions, private afs: AngularFirestore, private auth: AuthService) {
    auth.user$.subscribe()
  }
}