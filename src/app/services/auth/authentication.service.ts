import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ConfigurationService} from '../config/configuration.service';

class JWTRequest {
  username: string;
  password: string;

  constructor(username: string, password: string) {
    this.username = username;
    this.password = password;
  }
}

export class JWTResponse {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private readonly authenticationUrl: string;

  constructor(
    private http: HttpClient,
    private config: ConfigurationService) {
    this.authenticationUrl = config.backendUrl() + '/authenticate';
  }

  authenticate(username: string, password: string): Observable<JWTResponse> {
    const jwtRequest = new JWTRequest(username, password);

    return this.http.post<JWTResponse>(this.authenticationUrl, jwtRequest);
  }

  isLoggedIn(): boolean {
    const username = sessionStorage.getItem('username');
    return !(username === null);
  }

  logOut() {
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('token');
  }
}
