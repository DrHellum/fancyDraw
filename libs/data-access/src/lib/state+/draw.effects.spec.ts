import { TestBed } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/firestore';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '@fancydraw/core';
import { provideMockActions } from '@ngrx/effects/testing';
import { StoreModule } from '@ngrx/store';
import { cold, hot } from 'jasmine-marbles';
import { from, Observable } from 'rxjs';
import {
  AddDraw,
  AddSuccess, DeleteDraw, DeleteSuccess,
  DrawAdded,
  DrawModified,
  DrawRemoved,
  QueryDraws,
  UpdateDraw,
  UpdateSuccess
} from './draw.actions';
import { DrawEffects } from './draw.effects';
import { Draw } from './draw.model';
import { reducer } from './draw.reducer';


describe('DrawEffects', () => {
  const draw: Draw = {
    id: "draw1",
    name: "draw1",
    created: new Date()
  };
  const getFirebaseAction = (type: string, draw: Draw) => ({
    type,
    payload: {
      doc: {
        id: draw.id,
        data: () => draw
      }
    }
  });

  let actions$: Observable<any>;
  let effects: DrawEffects;
  let fireStoreMock = {
    collection(address: string, options) {
      if (options) {
        options({
          where() {},
          orderBy() {}
        })
      }
      return {
        doc() { return {
          update: () => from([draw]),
          delete: () => from([draw])
        }},
        add: () => from([draw]),
        stateChanges: () => from(
          [cold('a-b-c-|', {
            a: getFirebaseAction('added', draw),
            b: getFirebaseAction('modified', draw),
            c: getFirebaseAction('removed', draw)
          })])
      }
    }
  };
  let authServiceMock = {
    user$: from([{uid: "xxx"}])
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature("draw", reducer)
      ],
      providers: [
        DrawEffects,
        provideMockActions(() => actions$),
        {provide: AngularFirestore, useValue: fireStoreMock},
        {provide: AuthService, useValue: authServiceMock}

      ]
    });

    effects = TestBed.get(DrawEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  describe('query effect', () => {
    it('should listen to firebase changes and convert them to store actions', () => {

      actions$ = hot('-a-|', {a: new QueryDraws()});

      expect(effects.query$).toBeObservable(
        hot('-a-b-c-|', {a: new DrawAdded(draw), b: new DrawModified(draw), c: new DrawRemoved(draw)})
      );
    });
  });

  describe('update effect', () => {
    it('should update firestore when UpdateDraw action is dispatched', () => {

      actions$ = hot('-a-|', {
        a: new UpdateDraw({
          draw: {
            id: draw.id,
            changes: draw
          }
        })
      });

      expect(effects.update$).toBeObservable(
        hot('-a-|', {a: new UpdateSuccess()})
      );

    });
  });

  describe('add effect', () => {
    it('should add to firestore when AddDraw action is dispatched', () => {

      actions$ = hot('-a-|', {
        a: new AddDraw({draw})
      });

      expect(effects.add$).toBeObservable(
        hot('-a-|', {a: new AddSuccess()})
      );

    });
  });

  describe('delete effect', () => {
    it('should delete from firestore when DeleteDraw action is dispatched', () => {

      actions$ = hot('-a-|', {
        a: new DeleteDraw({id: draw.id})
      });

      expect(effects.delete$).toBeObservable(
        hot('-a-|', {a: new DeleteSuccess()})
      );

    });
  });

});
