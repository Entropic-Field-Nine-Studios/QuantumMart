import { HttpClient } from '@angular/common/http';
import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
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

  private readonly cartLoadedSubject = new BehaviorSubject(false);
  readonly cartLoaded$ = this.cartLoadedSubject.asObservable();

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
        const guestId = this.auth.guestId;

        if (guestId != null) {
          this.getCartItemsByGuestSession(guestId).subscribe((items) => {
            this._cartItems.set(items);
            this.cartLoadedSubject.next(true);
          });
        } else {
          this._cartItems.set([]);
        }

        return;
      }

      this.getCartItemsByUserId(userId).subscribe((items) => {
        this._cartItems.set(items);
        this.cartLoadedSubject.next(true);
      });
    });
  }

  /**
   * Sends a request to add an item to a user / guest's cart, then updates the local singleton with the
   * retrieved information.
   *
   * @param request
   * @returns Cart item that was added.
   */
  addItemToCart(request: AddCartItemRequest): Observable<CartItem> {
    return this.http.post<CartItem>(`${this.baseUrl}`, request).pipe(
      tap((addedItem) => {
        const itemExists = this._cartItems().some((item) => item.id === addedItem.id);

        this._cartItems.update((items) =>
          itemExists
            ? // Update the item's details
              items.map((item) => (item.id === addedItem.id ? addedItem : item))
            : // Append the new item to the list
              [...items, addedItem],
        );
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
