import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { ItemListingService } from './item-listing.service';
import { catchError, map, of } from 'rxjs';

/**
 * Route guard for editing item listings. Allows the user to edit the listing
 * only if they own said listing. Redirects them back to the item listing page
 * otherwise, or 404 if an error occurs.
 *
 * @returns
 */
export const editItemListingGuard: CanActivateFn = (route) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  const itemListingService = inject(ItemListingService);

  const listingId = route.paramMap.get('listid');

  if (listingId === null) {
    return router.createUrlTree(['/404']);
  }

  // Used for navigating the user back to the listing page
  const backTree = router.createUrlTree([`/listing`, listingId]);

  return itemListingService.getListingById(listingId).pipe(
    map((listing) => {
      if (!auth.isLoggedIn || listing.sellerId !== auth.userId) {
        return backTree;
      }

      return true;
    }),
    catchError(() => {
      return of(router.createUrlTree(['/404']));
    }),
  );
};
