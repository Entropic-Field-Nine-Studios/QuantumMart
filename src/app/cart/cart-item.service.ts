import { HttpClient } from '@angular/common/http';
import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { CartItem } from './cart-item.model';
import { ItemListing } from '../item-listings/item-listing.model';
import { environment } from '../../environments/environment';
import { AuthService } from '../auth/auth.service';

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
   * @param userId UUID of the user to update cart on.
   * @param listing Item listing being added to cart.
   * @returns Cart item that was added.
   */
  addItemToCart(userId: string, listing: ItemListing): Observable<CartItem> {
    return this.http.post<CartItem>(`${this.baseUrl}/user/${userId}`, listing).pipe(
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
  clearCart(userId: string): Observable<object> {
    return this.http
      .delete(`${this.baseUrl}/user/${userId}`)
      .pipe(tap(() => this._cartItems.set([])));
  }

  /**
   * Removes an item from a user's cart.
   *
   * @param userId The cart's user ID
   * @param listingId UUID of the listing to remove
   * @returns
   */
  removeItemFromCart(userId: string, listingId: string): Observable<object> {
    return this.http.delete(`${this.baseUrl}/user/${userId}/listing/${listingId}`).pipe(
      tap(() => {
        this._cartItems.update((items) =>
          items.filter((item) => item.itemListing.id !== listingId),
        );
      }),
    );
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
}
