import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CartItem } from './cart-item.model';
import { ItemListing } from '../item-listings/item-listing.model';

@Injectable({
  providedIn: 'root',
})
export class CartItemService {
  private readonly baseUrl = 'http://localhost:8080/api/cart-items';

  constructor(private http: HttpClient) {}

  /**
   * Retrieves a list of cart items associated with a user ID.
   *
   * @param userId ID of user to retrieve cart items from.
   * @returns List of cart items in user's cart.
   */
  getCartItemsByUserId(userId: string): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(`${this.baseUrl}/userid=${userId}`);
  }

  /**
   * Adds an item with quantity 1 to a user's cart.
   *
   * @param userId ID of user to update cart on.
   * @param listing Item listing being added to cart.
   * @returns Cart item that was added.
   */
  addItemToCart(userId: string, listing: ItemListing): Observable<CartItem> {
    return this.http.post<CartItem>(`${this.baseUrl}/userid=${userId}`, listing);
  }

  /**
   * Deletes every single cart item associated with a user.
   *
   * @param userId ID of user to clear their cart.
   * @returns Observable showing successsful cart clearing.
   */
  clearCart(userId: string): Observable<Object> {
    return this.http.delete(`${this.baseUrl}/userid=${userId}`);
  }
}
