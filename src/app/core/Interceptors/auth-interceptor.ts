import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';
import { LoggerService } from '../Services/logger.service';
import { retryWhen, mergeMap, timer, throwError, catchError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  const logger = inject(LoggerService);

  // Skip auth endpoints if needed
  if (req.url.includes('/users')) {
    return next(req);
  }

  const token = auth.getToken();

  const authRequest = token
    ? req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      })
    : req;
  return next(authRequest).pipe(
    retryWhen((errors) =>
      errors.pipe(
        mergeMap((error, retryCount) => {
          if (retryCount < 1 && (error.status === 0 || error.status === 500)) {
            logger.warn('Retrying request...', error);
            return timer(1000);
          }
          return throwError(() => error);
        }),
      ),
    ),
    catchError((error: HttpErrorResponse) => {
      logger.error('HTTP Error', error);
      if (error.status === 401 || error.status === 403) {
        auth.logout();
        router.navigate(['/login']);
      }
      return throwError(() => error);
    }),
  );
};
