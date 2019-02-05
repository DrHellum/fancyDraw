import { TestBed } from '@angular/core/testing';
import { AngularFireAuth } from '@angular/fire/auth';
import { BrowserTestingModule } from '@angular/platform-browser/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { CoreModule } from '@fancydraw/core';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  const fireAuthMock = {
    auth: {
      signInWithPopup() {
        return Promise.resolve<Boolean>(true);
      },
      signOut() {

      }
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserTestingModule,
        RouterTestingModule,
        CoreModule
      ],
      providers: [
        {provide: AngularFireAuth, useValue: fireAuthMock}
      ]
    });



  });

  it('should be created', () => {
    const service: AuthService = TestBed.get(AuthService);
    expect(service).toBeTruthy();
  });

  it('login should login with google and navigate to draws', (done: Function) => {
    const googleSignInMethod = spyOn(fireAuthMock.auth, "signInWithPopup").and.callThrough();
    const navigateSpy = spyOn(TestBed.get(Router), "navigate");

    const service = TestBed.get(AuthService);
    service.login();

    setTimeout(() => {
      expect(googleSignInMethod).toHaveBeenCalled();
      expect(navigateSpy).toHaveBeenCalledWith(["draws"]);
      done();
    })
  });

  it('error when logging in should navigate home', (done: Function) => {
    const googleSignInMethod = spyOn(fireAuthMock.auth, "signInWithPopup").and.returnValue(Promise.reject("Problem"));
    const navigateSpy = spyOn(TestBed.get(Router), "navigate");

    const service = TestBed.get(AuthService);
    service.login();

    setTimeout(() => {
      expect(googleSignInMethod).toHaveBeenCalled();
      expect(navigateSpy).toHaveBeenCalledWith(["home"]);
      done();
    });
  });

  it('logout should logut and navigate to home', () => {
    const googleSignOutMethod = spyOn(fireAuthMock.auth, "signOut").and.callThrough();
    const navigateSpy = spyOn(TestBed.get(Router), "navigate");

    const service = TestBed.get(AuthService);
    service.logout();

    expect(googleSignOutMethod).toHaveBeenCalled();
    expect(navigateSpy).toHaveBeenCalledWith(["home"]);
  });
});
