import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AuthenticationService} from '../../services/auth/authentication.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService) { }

  ngOnInit() { }

  search(input: string) {
    this.router.navigateByUrl('search/' + input);
  }

  logout() {
    this.authenticationService.logOut();
    this.router.navigateByUrl('login');
  }

}
