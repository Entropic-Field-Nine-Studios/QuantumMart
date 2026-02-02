import { HttpInterceptorFn } from '@angular/common/http';

/**
 * Interceptor which attaches the login token to every request.
 *
 * @param req
 * @param next
 * @returns
 */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = typeof window !== 'undefined' ? window.localStorage.getItem('token') : null;

  const authReq = token
    ? req.clone({
        setHeaders: { Authorization: `Bearer ${token}` },
      })
    : req;

  return next(authReq);
};
