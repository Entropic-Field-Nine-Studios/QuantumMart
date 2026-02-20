import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ItemListing } from './item-listing.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ItemListingService {
  private readonly baseUrl = 'http://localhost:8080/api/item-listings';

  private http = inject(HttpClient);

  /**
   * Retrieves every single item listing from the database.
   *
   * @returns List containing each item listing.
   */
  getAllListings(): Observable<ItemListing[]> {
    return this.http.get<ItemListing[]>(`${this.baseUrl}`);
  }

  /**
   * Retrieves every item listing being sold by a user referencing their username. Casing is ignored.
   *
   * ### Error codes
   * - 404 (Not Found) - If the user does not exist.
   *
   * @param username Username of the seller.
   * @returns List of item listings being sold by the user.
   */
  getAllListingsByUsername(username: string): Observable<ItemListing[]> {
    return this.http.get<ItemListing[]>(`${this.baseUrl}/seller=${username}`);
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
   * @param listing The item listing information.
   * @returns The saved item listing.
   */
  createListing(listing: ItemListing): Observable<ItemListing> {
    return this.http.post<ItemListing>(`${this.baseUrl}`, listing);
  }
}
