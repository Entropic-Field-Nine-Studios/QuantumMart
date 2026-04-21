import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ItemListing } from './item-listing.model';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { UpdateItemListing } from './update-listing.model';
import { CreateItemListingRequest } from './create-item-listing-request.model';

@Injectable({
  providedIn: 'root',
})
export class ItemListingService {
  readonly baseUrl = `${environment.apiUrl}/item-listings`;

  private readonly http = inject(HttpClient);

  /**
   * Retrieves every single item listing from the database.
   *
   * @returns List containing each item listing.
   */
  getAllListings(): Observable<ItemListing[]> {
    return this.http.get<ItemListing[]>(`${this.baseUrl}`);
  }

  /**
   * Retrieves every item listing being sold by a user.
   *
   * ### Error codes
   * - 404 (Not Found) - If the user does not exist.
   *
   * @param userId User ID of the seller.
   * @returns List of item listings being sold by the user.
   */
  getListingsByUserId(userId: string): Observable<ItemListing[]> {
    return this.http.get<ItemListing[]>(`${this.baseUrl}/seller/${userId}`);
  }

  /**
   * Retrieves an item listing that matches the provided ID.
   *
   * ### Error codes
   * - 404 (Not Found) - If no item listing matches the ID.
   *
   * @param id UUID of the item listing.
   * @returns Item listing associated with the ID.
   */
  getListingById(id: string): Observable<ItemListing> {
    return this.http.get<ItemListing>(`${this.baseUrl}/${id}`);
  }

  /**
   * Saves a new item listing entry to the database.
   *
   * @param req The item listing information.
   * @returns The saved item listing.
   */
  createListing(req: CreateItemListingRequest): Observable<ItemListing> {
    return this.http.post<ItemListing>(`${this.baseUrl}`, req);
  }

  /**
   * Updates fields in an item listing.
   *
   * @param listingId ID of the item listing to update.
   * @param updates Fields with new information.
   * @returns
   */
  updateListing(listingId: string, updates: UpdateItemListing): Observable<object> {
    return this.http.patch(`${this.baseUrl}/${listingId}`, updates);
  }
}
