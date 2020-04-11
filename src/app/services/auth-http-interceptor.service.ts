import { Injectable } from '@angular/core';
import {HttpHandler, HttpInterceptor, HttpRequest, HttpEvent, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthHttpInterceptorService implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const username = sessionStorage.getItem('username');
    const token = sessionStorage.getItem('token');

    if (username && token) {
      req = req.clone({
        setHeaders: {
          Authorization: 'Bearer ' + sessionStorage.getItem('token')
        }
      });
    }

    return next.handle(req);
  }
}
