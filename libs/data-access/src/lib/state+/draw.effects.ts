import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from '@fancydraw/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { User } from 'firebase';
import { combineLatest, from, Observable } from 'rxjs';
import { filter } from 'rxjs/internal/operators/filter';
import { map, mergeMap, switchMap } from 'rxjs/operators';
import {
  AddDraw,
  AddSuccess,
  DeleteDraw,
  DeleteSuccess,
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
    this.auth.user$.pipe(filter((user: User) => !!(user && user.uid))),
    this.actions$.pipe(ofType(DrawActionTypes.QueryDraws))
  ).pipe(
    switchMap(([user]) => {
      return this.afs
        .collection(`users/${user.uid}/draws`, ref => {
          return ref.orderBy('created');
        })
        .stateChanges();
    }),
    mergeMap(actions => {
      return actions;
    }),
    map(fireStoreAction => {
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
    })
  );

  @Effect()
  update$: Observable<Action> = combineLatest(
    this.auth.user$.pipe(filter((user: User) => !!(user && user.uid))),
    this.actions$.pipe(ofType(DrawActionTypes.UpdateDraw))
  ).pipe(
    switchMap(([user, action]: [User, UpdateDraw]) => {
      const ref = this.afs.collection<Draw>(`users/${user.uid}/draws`);
      return from(
        ref
          .doc(action.payload.draw.id.toString())
          .update(action.payload.draw.changes)
      );
    }),
    map(() => new UpdateSuccess())
  );

  @Effect()
  add$: Observable<Action> = combineLatest(
    this.auth.user$.pipe(filter((user: User) => !!(user && user.uid))),
    this.actions$.pipe(ofType(DrawActionTypes.AddDraw))
  ).pipe(
    switchMap(([user, action]: [User, AddDraw]) => {
      const ref = this.afs.collection<Draw>(`users/${user.uid}/draws`);
      return from(ref.add(action.payload.draw));
    }),
    map(() => new AddSuccess())
  );

  @Effect()
  delete$: Observable<Action> = combineLatest(
    this.auth.user$.pipe(filter((user: User) => !!(user && user.uid))),
    this.actions$.pipe(ofType(DrawActionTypes.DeleteDraw))
  ).pipe(
    switchMap(([user, action]: [User, DeleteDraw]) => {
      const ref = this.afs.collection<Draw>(`users/${user.uid}/draws`);
      return from(ref.doc(action.payload.id).delete());
    }),
    map(() => new DeleteSuccess())
  );

  constructor(
    private actions$: Actions,
    private afs: AngularFirestore,
    private auth: AuthService
  ) {
    auth.user$.subscribe();
  }
}
