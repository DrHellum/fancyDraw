import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService) {
  }

  canActivate(): Observable<boolean> {
    return this.authService.user$
      .pipe(map(user => {
        if (user && user.uid) {
          return true;
        } else {
          this.router.navigate(['/home']);
          return false;
        }
      }));
  }
}
