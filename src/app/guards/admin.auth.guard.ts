import {Injectable} from '@angular/core';
import {
  CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router
} from '@angular/router';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {AuthService} from '../services/auth.service';
import {FirebaseService} from '../services/firebase.service';
import {checkAdminRole} from '../utils.module';
import {AngularFireAuth} from '@angular/fire/auth';
import get from 'lodash/get';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {
  constructor(private authService: AuthService,
              private router: Router,
              private firebaseService: FirebaseService,
              private fireAuth: AngularFireAuth) {
  }

  canActivate(): Promise<boolean> {
    const router = this.router;

    return new Promise((resolve) => {
      this.fireAuth.auth.onAuthStateChanged((user) => {
        this.firebaseService.getRole(user.email).subscribe(roles => {
          if (get(roles, '[0].role') === 'admin') {
            resolve(true);
          } else {
            router.navigate(['/wycieczki']);
            resolve(false);
          }
        });
      });
    });
  }
}
