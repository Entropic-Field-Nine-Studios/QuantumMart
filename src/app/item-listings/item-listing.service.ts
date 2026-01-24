import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ItemListingService {
  private readonly baseUrl = "http://localhost:8080/api/item-listings";

  constructor(private http: HttpClient) {}

  
}
