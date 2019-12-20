import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router }
  from '@angular/router';
import {Observable, pipe} from 'rxjs';
import { map } from 'rxjs/operators';
import {AuthService} from '../services/auth.service';
import { customClaims } from '@angular/fire/auth-guard';
@Injectable({
  providedIn: 'root'
})
export class LoggedInAuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot):
  Observable<boolean> {
    return this.authService.authState$.pipe(map(state => {
        if (state !== null) { return true; }
        this.router.navigate(['/login']);
        return false;
      }
      )
    );
  }
}
