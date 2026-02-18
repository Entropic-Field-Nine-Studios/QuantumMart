import { ItemListing } from '../item-listings/item-listing.model';

export interface CartItem {
  cartItemId: string;
  quantity: number;
  itemListing: ItemListing;
}
