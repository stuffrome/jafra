import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';
import {AuthenticationService} from '../../services/auth/authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  constructor(
    private userService: UserService,
    private authenticationService: AuthenticationService,
    private router: Router) { }

  ngOnInit() {
    this.loggedInCheck();
  }

  loggedInCheck() {
    if (this.authenticationService.isLoggedIn()) {
      this.router.navigateByUrl('recommendations');
    }
  }

  register(username: string, email: string, password: string, passwordConfirm: string) {
    // Validation
    if (password === passwordConfirm) {
      this.userService.createUser(username, email, password);
    }
  }

}
