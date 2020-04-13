import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {AuthenticationService} from '../../services/auth/authentication.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  username: string;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService) {
  }

  ngOnInit() {
    this.username = sessionStorage.getItem('username');
  }

  search(input: string) {
    this.router.navigateByUrl('search/' + input);
  }

  logout() {
    this.authenticationService.logOut();
    this.router.navigateByUrl('login');
  }

  isActive(url: string): boolean {
    return this.router.url === url;
  }

}
