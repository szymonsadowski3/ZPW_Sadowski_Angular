import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {FormControl, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'sign-in-component',
  styleUrls: ['./sign-in.component.css'],
  templateUrl: './sign-in.component.html',
})
export class SignInComponent implements OnInit {
  modelFormLogin: FormGroup;
  modelFormRegister: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {}

  onSubmitLogin() {
    this.spinner.show();

    this.authService.login({
      email: this.modelFormLogin.value.email,
      password: this.modelFormLogin.value.password,
    }).then(() => {
      this.spinner.hide();
      this.router.navigate(['/wycieczki']);
    }).catch(e => {
      this.spinner.hide();
      alert(e.message);
    });
  }

  ngOnInit(): void {
    this.modelFormLogin = new FormGroup({
      email: new FormControl(''),
      password: new FormControl(''),
    });

    this.modelFormRegister = new FormGroup({
      email: new FormControl(''),
      password: new FormControl(''),
    });
  }

  onSubmitRegister() {
    this.spinner.show();
    this.authService.register({
      email: this.modelFormRegister.value.email,
      password: this.modelFormRegister.value.password,
    }).then(() => {
      this.spinner.hide();
      this.router.navigate(['/wycieczki']);
    }).catch(e => {
      this.spinner.hide();
      alert(e.message);
    });
  }
}
