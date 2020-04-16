import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../services/auth/authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private readonly DEFAULT_SIGNIN_TEXT = 'SIGN IN';

  private signInBtnText: string;
  private failedLogin: boolean;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService) {
    this.signInBtnText = this.DEFAULT_SIGNIN_TEXT;
    this.failedLogin = false;
  }

  ngOnInit() {
    this.loggedInCheck();
  }

  loggedInCheck() {
    if (this.authenticationService.isLoggedIn()) {
      this.router.navigateByUrl('recommendations');
    }
  }

  signIn(username: string, password: string) {
    this.signInBtnText = 'SIGNING IN...';
    this.authenticationService.authenticate(username, password).subscribe(res => {
      if (res.token) {
        sessionStorage.setItem('username', username);
        sessionStorage.setItem('token', res.token);

        this.router.navigateByUrl('recommendations');
      }
    }, err => {
      this.signInBtnText = this.DEFAULT_SIGNIN_TEXT;
      this.failedLogin = true;
    });
  }

}
