import { tap } from 'rxjs/operators';
import { ConstantsService } from '../constants/constants.service';
import { ToastrService } from 'ngx-toastr';

import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptorFn, HttpErrorResponse, HttpHandlerFn } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { inject } from '@angular/core';

declare var $:any;

export const errorHandlerInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
  
  const router = inject(Router);
  const toastr = inject(ToastrService);
  const constants = inject(ConstantsService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        toastr.error(constants.MESSAGES['UNAUTHORIZED']);
        router.navigate(['login']); 
      } else if(error.status === 403){
        toastr.error(constants.MESSAGES['FORBIDDEN']);
        router.navigate(['login']);
      } else {
        if(error.error && error.error.message){
          toastr.error(error.error.message);
        }else{
          toastr.error(constants.MESSAGES['ERROR']);
        }
      }
      // You can customize error handling for other status codes as needed

      return throwError(() => error);
    })
  );
};