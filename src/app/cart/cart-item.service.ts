import { HttpClient } from '@angular/common/http';
import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { CartItem } from './cart-item.model';
import { environment } from '../../environments/environment';
import { AuthService } from '../auth/auth.service';
import { AddCartItemRequest } from './add-cart-item-request.model';

@Injectable({
  providedIn: 'root',
})
export class CartItemService {
  readonly baseUrl = `${environment.apiUrl}/cart-items`;

  private readonly http = inject(HttpClient);
  private readonly auth = inject(AuthService);
  private readonly _cartItems = signal<CartItem[]>([]);

  /** The logged-in user's cart items. */
  readonly cartItems = this._cartItems.asReadonly();

  /** Amount of cart items in the logged-in user's cart (counting quantity). */
  readonly cartCount = computed(() =>
    this._cartItems().reduce((sum, item) => sum + item.quantity, 0),
  );

  /** Total price of each cart item. */
  readonly subtotal = computed(() =>
    this._cartItems().reduce((sum, item) => sum + item.itemListing.price * item.quantity, 0),
  );

  constructor() {
    effect(() => {
      // Trigger this effect
      this.auth.authChanged();

      const userId = this.auth.userId;

      if (!userId) {
        this._cartItems.set([]);
        return;
      }

      this.getCartItemsByUserId(userId).subscribe((items) => this._cartItems.set(items));
    });
  }

  /**
   * Adds an item with quantity 1 to a user's cart. If the user already has this item
   * in their cart, the quantity of the existing item is incremented by 1 instead.
   *
   * @param request
   * @returns Cart item that was added.
   */
  addItemToCart(request: AddCartItemRequest): Observable<CartItem> {
    return this.http.post<CartItem>(`${this.baseUrl}`, request).pipe(
      tap((added) => {
        const exists = this._cartItems().some((item) => item.id === added.id);

        if (!exists) {
          // Add the item as a new entry
          this._cartItems.update((items) => [...items, added]);
        } else {
          // Increase the existing item's quantity
          this._cartItems.update((items) =>
            items.map((item) =>
              item.id === added.id ? { ...item, quantity: item.quantity + 1 } : item,
            ),
          );
        }
      }),
    );
  }

  /**
   * Deletes every single cart item associated with a user.
   *
   * @param userId UUID of user to clear their cart.
   * @returns Observable showing successsful cart clearing.
   */
  clearUserCart(userId: string): Observable<object> {
    return this.http
      .delete(`${this.baseUrl}/user/${userId}`)
      .pipe(tap(() => this.clearLocalCart()));
  }

  /**
   * Clears items in a guest's cart.
   *
   * @param guestSessionId Session ID for the non-user.
   * @returns
   */
  clearGuestCart(guestSessionId: string): Observable<object> {
    return this.http
      .delete(`${this.baseUrl}/guest/${guestSessionId}`)
      .pipe(tap(() => this.clearLocalCart()));
  }

  /**
   * Clears the locally saved cart items.
   */
  clearLocalCart() {
    this._cartItems.set([]);
  }

  /**
   * Removes an item from a user's cart.
   *
   * @param userId The cart's user ID
   * @param listingId UUID of the listing to remove
   * @returns
   */
  removeItemFromUserCart(userId: string, listingId: string): Observable<object> {
    return this.http
      .delete(`${this.baseUrl}/user/${userId}/listing/${listingId}`)
      .pipe(tap(() => this.removeLocalItem(listingId)));
  }

  /**
   * Removes an item from a non-user's cart.
   *
   * @param guestSessionId Session ID of the non-user
   * @param listingId UUID of the listing to remove
   * @returns
   */
  removeItemFromGuestCart(guestSessionId: string, listingId: string): Observable<object> {
    return this.http
      .delete(`${this.baseUrl}/guest/${guestSessionId}/listing/${listingId}`)
      .pipe(tap(() => this.removeLocalItem(listingId)));
  }

  private removeLocalItem(listingId: string) {
    this._cartItems.update((items) => items.filter((item) => item.itemListing.id !== listingId));
  }

  /**
   * Retrieves a list of cart items associated with a user ID.
   *
   * @param userId UUID of the user to retrieve cart items from.
   * @returns List of cart items in user's cart.
   */
  private getCartItemsByUserId(userId: string): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(`${this.baseUrl}/user/${userId}`);
  }

  /**
   * Retrieves items from a guest session ID.
   *
   * @param sessionId
   * @returns
   */
  private getCartItemsByGuestSession(sessionId: string): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(`${this.baseUrl}/guest/${sessionId}`);
  }
}
