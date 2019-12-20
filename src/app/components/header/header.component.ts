import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {NgxSpinnerService} from 'ngx-spinner';
import {FirebaseService} from '../../services/firebase.service';
import get from 'lodash/get';
import {AngularFireAuth} from '@angular/fire/auth';

@Component({
  selector: 'header-component',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isAdmin = false;

  constructor(
    private authService: AuthService,
    private fireAuth: AngularFireAuth,
    private firebaseService: FirebaseService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.checkIsUserAnAdministrator();
  }

  getUser() {
    return this.authService.getUser();
  }

  logout() {
    this.spinner.show();
    this.authService.logout().then(() => {
      this.spinner.hide();
      this.router.navigate(['/login']);
    });
  }

  checkIsUserAnAdministrator() {
    this.fireAuth.auth.onAuthStateChanged((user) => {
      this.firebaseService.getRole(user.email).subscribe(roles => {
        console.log(get(roles, '[0].role'));
        this.isAdmin = (get(roles, '[0].role') === 'admin');
      });
    });
  }
}
