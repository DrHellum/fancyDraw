import { TestBed } from '@angular/core/testing';
import { AngularFireAuth } from '@angular/fire/auth';
import { RouterTestingModule } from '@angular/router/testing';
import { CoreModule } from '@fancydraw/core';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  const fireAuthMock = {

  };

  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      RouterTestingModule,
      CoreModule
    ],
    providers: [
      {provide: AngularFireAuth, useValue: fireAuthMock}
    ]
  }));

  it('should be created', () => {
    const service: AuthService = TestBed.get(AuthService);
    expect(service).toBeTruthy();
  });
});
