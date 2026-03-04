import { ItemListing } from '../item-listings/item-listing.model';

export interface CartItem {
  id: string;
  quantity: number;
  itemListing: ItemListing;
}
