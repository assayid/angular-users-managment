import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {UsersService} from '../services/users.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private service: UsersService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const currentUser = this.service.currentUserValue;
    if (currentUser && currentUser.token){
          request = request.clone({
            setHeaders : {
             Authorization: `Barear ${currentUser.token}`
            }
          });
    }
    return next.handle(request);
  }
}
