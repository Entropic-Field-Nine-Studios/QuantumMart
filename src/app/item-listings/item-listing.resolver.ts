import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { ItemListingService } from './item-listing.service';
import { ItemListing } from './item-listing.model';

@Injectable({ providedIn: 'root' })
export class ItemListingResolver implements Resolve<ItemListing[]> {

  constructor(private listingService: ItemListingService) {}

  resolve(): Observable<ItemListing[]> {
    return this.listingService.getAllListings();
  }
}