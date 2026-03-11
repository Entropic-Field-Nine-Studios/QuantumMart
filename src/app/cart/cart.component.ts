import { Component, effect, inject, signal } from '@angular/core';
import { CartItemService } from './cart-item.service';
import { CartItem } from './cart-item.model';
import { UserStore } from '../core/stores/user.store';
import { User } from '../users/user.model';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { CartItemCardListComponent } from './cart-item-card-list/cart-item-card-list.component';
import { ItemListing } from '../item-listings/item-listing.model';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatAnchor } from '@angular/material/button';
import { ConfirmDialogService } from '../shared/dialogs/confirm-dialog.service';

@Component({
  selector: 'app-cart',
  imports: [MatProgressSpinner, CartItemCardListComponent, MatAnchor],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {
  readonly cartItems = signal<CartItem[] | null>(null);

  private readonly cartItemService = inject(CartItemService);
  private readonly userStore = inject(UserStore);
  private readonly router = inject(Router);
  private readonly confirmService = inject(ConfirmDialogService);

  constructor() {
    effect(() => {
      if (!this.user) return;

      this.loadCart();
    });
  }

  removeCartItem(listing: ItemListing) {
    this.cartItemService.removeItemFromCart(this.user!.id, listing.id!).subscribe({
      next: () => {
        alert(`${listing.title} was removed.`);
        this.loadCart();
      },
      error: (err: HttpErrorResponse) => alert(err.message),
    });
  }

  clearCart() {
    this.confirmService
      .confirm('Are you sure you want to clear your cart?')
      .subscribe((confirmed) => {
        if (confirmed) {
          this.cartItemService.clearCart(this.user!.id).subscribe({
            next: () => {
              alert('Your cart was cleared.');
              this.loadCart();
            },
            error: (err: HttpErrorResponse) => alert(err.message),
          });
        }
      });
  }

  navigateCheckout() {
    this.router.navigate(['/checkout']);
  }

  private get user(): User | null {
    return this.userStore.user();
  }

  private loadCart() {
    this.cartItemService.getCartItemsByUserId(this.user!.id).subscribe({
      next: (items) => this.cartItems.set(items),
      error: () => this.cartItems.set([]),
    });
  }
}
