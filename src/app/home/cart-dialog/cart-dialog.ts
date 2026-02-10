import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { CartItem } from '../../cart/cart-item.model';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import {
  MatCard,
  MatCardHeader,
  MatCardTitle,
  MatCardSubtitle,
  MatCardContent,
  MatCardActions,
} from '@angular/material/card';
import {
  MAT_DIALOG_DATA,
  MatDialogContent,
  MatDialogTitle,
  MatDialogActions,
} from '@angular/material/dialog';
import { CurrencyPipe } from '@angular/common';
import { A11yModule } from '@angular/cdk/a11y';
import { MatAnchor, MatIconButton } from '@angular/material/button';
import { CartItemService } from '../../cart/cart-item.service';
import { AuthService } from '../../auth/auth.service';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { ItemListing } from '../../item-listings/item-listing.model';

@Component({
  selector: 'app-cart-dialog',
  imports: [
    MatListModule,
    MatDividerModule,
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardSubtitle,
    MatCardContent,
    CurrencyPipe,
    MatDialogContent,
    MatDialogTitle,
    A11yModule,
    MatDialogActions,
    MatAnchor,
    MatCardActions,
    MatIconButton,
    MatIcon,
    MatTooltip,
  ],
  templateUrl: './cart-dialog.html',
  styleUrl: './cart-dialog.scss',
})
export class CartDialogComponent implements OnInit {
  readonly data = inject<CartDialogData>(MAT_DIALOG_DATA);
  readonly cartItems = signal<CartItem[]>([]);
  readonly cartTotal = computed(() =>
    // Dynamically calculates the cart total as items are retrieved
    this.cartItems().reduce((sum, item) => sum + item.itemListing.price * item.quantity, 0),
  );

  constructor(
    private cartService: CartItemService,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.loadCartItems();
  }

  private loadCartItems(): void {
    this.cartService.getCartItemsByUserId(this.data.userId).subscribe({
      next: (items) => this.cartItems.set(items),
      error: (_) => alert("ERROR: Couldn't fetch items for user!"),
    });
  }

  clearCart(): void {
    const shouldClear = confirm('Are you sure you want to remove ALL items in your cart?');

    if (shouldClear) {
      this.cartService.clearCart(this.authService.userId!!).subscribe({
        next: (_) => {
          alert('Your cart was cleared.');
          this.loadCartItems();
        },
        error: (_) => alert("ERROR: Couldn't clear your cart."),
      });
    }
  }

  removeItem(listing: ItemListing): void {
    this.cartService.removeItemFromCart(this.authService.userId!!, listing.id!).subscribe({
      next: (_) => {
        alert('Removed item: ' + listing.title);
        this.loadCartItems();
      },
      error: (_) => alert("ERROR: Couldn't remove item!"),
    });
  }
}

interface CartDialogData {
  userId: string;
}
