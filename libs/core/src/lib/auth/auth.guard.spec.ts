import { inject, TestBed } from '@angular/core/testing';
import { AngularFireAuth } from '@angular/fire/auth';
import { RouterTestingModule } from '@angular/router/testing';
import { CoreModule } from '@fancydraw/core';

import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  beforeEach(() => {
    const angularFireAuthMock = {};

    TestBed.configureTestingModule({
      imports: [RouterTestingModule, CoreModule],
      providers: [
        {provide: AngularFireAuth, useValue: angularFireAuthMock},
        AuthGuard
      ]
    });
  });

  it('should ...', inject([AuthGuard], (guard: AuthGuard) => {
    expect(guard).toBeTruthy();
  }));
});
