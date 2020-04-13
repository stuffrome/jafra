import { Component } from '@angular/core';
import {AuthenticationService} from './services/auth/authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'jafra';

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router) {

  }

  userLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn();
  }
}
