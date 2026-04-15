import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { CartItemService } from '../cart/cart-item.service';

/**
 * Route activation guard which ensures the following:
 * 1. The user is logged in
 * 2. Their cart is not empty
 *
 * If they do not meet the conditions, redirect them home.
 *
 * @returns
 */
export const checkoutGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const cartService = inject(CartItemService);
  const router = inject(Router);

  if (!authService.isLoggedIn) {
    return router.createUrlTree(['/login']);
  }

  if (cartService.cartCount() === 0) {
    return router.createUrlTree(['/home']);
  }

  return true;
};
