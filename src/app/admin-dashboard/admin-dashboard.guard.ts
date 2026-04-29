import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

/**
 * Accepts only clients that have an authorization role of admin or superadmin.
 * Navigates to 404 on failure.
 *
 * @returns
 */
export const adminGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (!auth.isLoggedIn) {
    return router.createUrlTree(['/404']);
  }

  const role = auth.userRole;
  if (role === null || !adminRoles.includes(role)) {
    return router.createUrlTree(['/404']);
  }

  return true;
};

const adminRoles = ['admin', 'superadmin'];
