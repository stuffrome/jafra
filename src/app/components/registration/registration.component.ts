import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';
import {AuthenticationService} from '../../services/auth/authentication.service';
import {Router} from '@angular/router';
import {delay} from 'rxjs/operators';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  DEFAULT_SIGNUP_TEXT = 'SIGN UP';

  signUpBtnText: string;

  failedRegistration: boolean;
  errorMessage: string;

  constructor(
    private userService: UserService,
    private authenticationService: AuthenticationService,
    private router: Router) {
    this.failedRegistration = false;
    this.signUpBtnText = this.DEFAULT_SIGNUP_TEXT;
  }

  ngOnInit() {
    this.loggedInCheck();
  }

  loggedInCheck() {
    if (this.authenticationService.isLoggedIn()) {
      this.router.navigateByUrl('recommendations');
    }
  }

  register(username: string, email: string, password: string, passwordConfirm: string) {
    if (password === passwordConfirm) {
      this.signUpBtnText = 'SIGNING UP...'
      this.userService.createUser(username, email, password).subscribe(res => {
        // Successful registration
        this.router.navigateByUrl('login');
      }, err => {
        this.errorMessage = err.error.message;
        this.failedRegistration = true;
        this.signUpBtnText = this.DEFAULT_SIGNUP_TEXT;
      });
    }
  }

}
