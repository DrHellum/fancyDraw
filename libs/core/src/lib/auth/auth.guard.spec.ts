import { inject, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService, CoreModule } from '@fancydraw/core';
import { of } from 'rxjs/internal/observable/of';

import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  const authServiceMock = {
    user$: {}
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, CoreModule],
      providers: [
        {provide: AuthService, useValue: authServiceMock},
        AuthGuard
      ]
    });
  });

  it('should ...', inject([AuthGuard], (guard: AuthGuard) => {
    expect(guard).toBeTruthy();
  }));

  describe('canActivate', () => {

    it('should return true if user is logged in', (done: Function) => {
      authServiceMock.user$ = of({uid: "xxx"});

      const guard = TestBed.get(AuthGuard);

      guard.canActivate().subscribe((result) => {
        expect(result).toBeTruthy();
        done();
      })

    });

    it('should return false and navigate to home if user is not logged in', (done: Function) => {
      authServiceMock.user$ = of({});
      const navigateSpy = spyOn(TestBed.get(Router), "navigate");

      const guard = TestBed.get(AuthGuard);

      guard.canActivate().subscribe((result) => {
        expect(result).toBeFalsy();
        expect(navigateSpy).toHaveBeenCalledWith(["/home"]);
        done();
      })
    });
  });
});
