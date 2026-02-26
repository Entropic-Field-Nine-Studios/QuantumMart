import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { CartItemService } from '../cart/cart-item.service';
import { catchError, map, of } from 'rxjs';

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

  return cartService.getCartItemsByUserId(authService.userId!).pipe(
    map((cartItems) => {
      if (cartItems.length === 0) {
        return router.createUrlTree(['/home']);
      }

      return true;
    }),
    catchError(() => {
      return of(router.createUrlTree(['/home']));
    }),
  );
};
