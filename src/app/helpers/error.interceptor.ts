import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {UsersService} from '../services/users.service';
import {catchError} from 'rxjs/operators';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private service: UsersService, private router: Router, ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(catchError(err => {
      if (err.status === 401 || err.status === 403) {
        this.service.logout();
        Swal.fire('Session expirée !', '', 'error').then(r => {
          if (r.isConfirmed){
            this.router.navigate(['login']);
          }
        });
      }
      const error = err.error.message || err.statusText;
      return throwError(error);
    }));

  }
}
