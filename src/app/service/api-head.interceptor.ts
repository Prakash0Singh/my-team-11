import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class ApiHeadInterceptor implements HttpInterceptor {

  constructor(private router:Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
   const newRequest=request.clone({
    headers:request.headers.set( 'Authorization', `Bearer ${localStorage.getItem("auth_key")}`)
   });

    return next.handle(newRequest).pipe(
      catchError((err:HttpErrorResponse) => {
        if (err instanceof ErrorEvent) {
          console.log('this is an error in the code');
          localStorage.clear();
          this.router.navigate([''])
        } 
        else {
          console.log(err);
          console.log(err.statusText);
          console.log(err.status);
          if (!err.status) {
            localStorage.clear();
            this.router.navigate([''])
          }
        }
        return throwError(() => new Error(err.statusText));
      }),
    );
  }
}
