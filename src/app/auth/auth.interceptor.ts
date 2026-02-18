import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';
import { tap } from 'rxjs';

/**
 * Interceptor which attaches the login token to every request.
 *
 * @param req
 * @param next
 * @returns
 */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.rawToken;

  const authReq =
    token && authService.isTokenValid()
      ? req.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`,
          },
        })
      : req;

  return next(authReq).pipe(
    tap({
      error: (err: HttpErrorResponse) => {
        // Token retrieved is invalid. Logout the user
        if (err.status === 401) {
          authService.logout();
        }
      },
    }),
  );
};
