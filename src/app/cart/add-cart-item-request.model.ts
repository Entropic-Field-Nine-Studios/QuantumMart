import { ItemListing } from '../item-listings/item-listing.model';

export interface AddCartItemRequest {
  userId: string | null;
  guestSessionId: string | null;
  listingInfo: ItemListing;
  itemQuantity: number;
}
