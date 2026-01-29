import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ItemListing } from './item-listing.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ItemListingService {
  private readonly baseUrl = "http://localhost:8080/api/item-listings";

  constructor(private http: HttpClient) {}

  getAllListings(): Observable<ItemListing[]> {
    return this.http.get<ItemListing[]>(`${this.baseUrl}`);
  }

  getAllListingsByUsername(username: string): Observable<ItemListing[]> {
    return this.http.get<ItemListing[]>(`${this.baseUrl}/seller=${username}`);
  }

  getListingById(id: string): Observable<ItemListing> {
    return this.http.get<ItemListing>(`${this.baseUrl}/${id}`);
  }

  createListing(listing: ItemListing): Observable<ItemListing> {
    return this.http.post<ItemListing>(`${this.baseUrl}`, listing);
  }
}
