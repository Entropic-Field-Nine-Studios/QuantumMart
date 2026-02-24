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
  MatDialogRef,
} from '@angular/material/dialog';
import { CurrencyPipe } from '@angular/common';
import { A11yModule } from '@angular/cdk/a11y';
import { MatAnchor, MatIconButton } from '@angular/material/button';
import { CartItemService } from '../../cart/cart-item.service';
import { AuthService } from '../../auth/auth.service';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { ItemListing } from '../../item-listings/item-listing.model';
import { Router } from '@angular/router';
import { CartItemCardComponent } from '../../cart/cart-item-card/cart-item-card';

@Component({
  selector: 'app-cart-dialog',
  imports: [
    MatListModule,
    MatDividerModule,
    CurrencyPipe,
    MatDialogContent,
    MatDialogTitle,
    A11yModule,
    MatDialogActions,
    MatAnchor,
    CartItemCardComponent,
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

  private cartService = inject(CartItemService);
  private authService = inject(AuthService);
  private router = inject(Router);
  private dialogRef = inject(MatDialogRef<CartDialogComponent>);

  ngOnInit(): void {
    this.loadCartItems();
  }

  private loadCartItems(): void {
    this.cartService.getCartItemsByUserId(this.data.userId).subscribe({
      next: (items) => this.cartItems.set(items),
      error: () => alert("ERROR: Couldn't fetch items for user!"),
    });
  }

  checkout() {
    this.router.navigateByUrl('/checkout');
    this.dialogRef.close();
  }

  clearCart(): void {
    const shouldClear = confirm('Are you sure you want to remove ALL items in your cart?');

    if (shouldClear) {
      this.cartService.clearCart(this.authService.userId!).subscribe({
        next: () => {
          alert('Your cart was cleared.');
          this.loadCartItems();
        },
        error: () => alert("ERROR: Couldn't clear your cart."),
      });
    }
  }

  removeItem(listing: ItemListing): void {
    this.cartService.removeItemFromCart(this.authService.userId!, listing.id!).subscribe({
      next: () => {
        alert('Removed item: ' + listing.title);
        this.loadCartItems();
      },
      error: () => alert("ERROR: Couldn't remove item!"),
    });
  }
}

interface CartDialogData {
  userId: string;
}
