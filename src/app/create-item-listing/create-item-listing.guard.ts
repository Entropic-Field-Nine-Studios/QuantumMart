import { CanDeactivateFn } from '@angular/router';
import { CreateItemListingComponent } from './create-item-listing.component';

export const createItemListingGuard: CanDeactivateFn<CreateItemListingComponent> = (
  component: CreateItemListingComponent,
) => {
  if (component.canDeactivate()) {
    return true;
  }

  return confirm('You have unsaved changes. Leave this page?');
};
