import { TestBed } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/firestore';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '@fancydraw/core';
import { provideMockActions } from '@ngrx/effects/testing';
import { StoreModule } from '@ngrx/store';
import { hot } from 'jasmine-marbles';
import { from, Observable } from 'rxjs';
import { DrawAdded, LoadDraws } from './draw.actions';
import { DrawEffects } from './draw.effects';
import { Draw } from './draw.model';
import { reducer } from './draw.reducer';


describe('DrawEffects', () => {
  const draw: Draw = {
    id: "draw1",
    name: "draw1"
  };

  let actions$: Observable<any>;
  let effects: DrawEffects;
  let fireStoreMock = {
    collection() {
      return {
        stateChanges() {
          return from(
            [from(
              [{
                type: 'added',
                payload: {
                  doc: {
                    id: draw.id,
                    data() {return draw;}
                  }
                }
              }]
            )]
          );
        }
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

  describe('loadDraws', () => {


    it('should load draws', () => {

      actions$ = hot('-a-|', {a: new LoadDraws()});

      expect(effects.query$).toBeObservable(
        hot('-a-|', {a: new DrawAdded(draw)})
      );
    });
  });

});
