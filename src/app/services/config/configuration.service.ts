import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {

  // true: running jafra-backend locally
  // false: running jafra-backend remotely (prod)
  private useLocalApi = false;

  private remoteUrl = 'https://jafra-backend.herokuapp.com';
  private localUrl = 'http://localhost:8080';

  constructor() { }

  public backendUrl(): string {
    if (this.useLocalApi) {
      return this.localUrl;
    } else {
      return this.remoteUrl;
    }
  }
}
