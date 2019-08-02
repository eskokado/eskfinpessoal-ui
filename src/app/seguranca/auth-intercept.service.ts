import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { mergeMap, catchError } from 'rxjs/operators';

import { AuthService } from './auth.service';
import { ErrorHandlerService } from '../core/error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptService {

  constructor(
    private authService: AuthService,
    private errorHandler: ErrorHandlerService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.includes('/oauth/token')) {
      return next.handle(req);
    }
    //Get Auth Token from Service which we want to pass thr service call
    const authToken: any = `Bearer ${localStorage.getItem('token')}`;
    // Clone the service request and alter original headers with auth token.
    req = req.clone({
      headers: req.headers.set('Content-Type', 'application/json').set('Authorization', authToken)
    });
    return next.handle(req).pipe(
      catchError(error => {
        if (error.status === 401 && error.error.error_description.includes('Access token expired')) {
          console.log('Renovar token');
          return this.authService.refreshToken().pipe(
            mergeMap((newToken: string) => {
              req = req.clone({ setHeaders: { Authorization: `Bearer ${newToken}`}});
              return next.handle(req);
            })
          );
        } else {
          this.errorHandler.handle(error);
        }
      })
    );
  }
}
