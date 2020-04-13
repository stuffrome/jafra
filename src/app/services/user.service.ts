import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ConfigurationService} from './config/configuration.service';

class UserAccountRequest {
  username: string;
  email: string;
  password: string;

  constructor(username: string, email: string, password: string) {
    this.username = username;
    this.email = email;
    this.password = password;
  }
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly userUrl: string;

  constructor(
    private http: HttpClient,
    private config: ConfigurationService) {
    this.userUrl = config.backendUrl() + '/users';
  }

  public createUser(username: string, email: string, password: string) {
    const newUserAccount = new UserAccountRequest(username, email, password);

    this.http.post(this.userUrl + '/create', newUserAccount).subscribe();
  }
}
