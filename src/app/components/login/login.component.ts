import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../services/auth/authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService) {
  }

  ngOnInit() {
  }

  signIn(username: string, password: string) {
    this.authenticationService.authenticate(username, password).subscribe(res => {
      if (res.token) {
        sessionStorage.setItem('username', username);
        sessionStorage.setItem('token', res.token);

        this.router.navigateByUrl('recommendations');
      }
    });
  }

}
