import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  register(username: string, email: string, password: string, passwordConfirm: string) {
    // Validation
    if (password === passwordConfirm) {
      console.log("Valid passwords");
      this.userService.createUser(username, email, password);
    }
  }

}
