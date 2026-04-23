import { Component, inject } from '@angular/core';
import { CartItemService } from './cart-item.service';
import { CartItem } from './cart-item.model';
import { CartItemCardListComponent } from './cart-item-card-list/cart-item-card-list.component';
import { ItemListing } from '../item-listings/item-listing.model';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatAnchor } from '@angular/material/button';
import { ConfirmDialogService } from '../shared/dialogs/confirm-dialog.service';
import { MessageService } from '../shared/message/message.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-cart',
  imports: [CartItemCardListComponent, MatAnchor],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {
  private readonly cartItemService = inject(CartItemService);
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  private readonly confirmService = inject(ConfirmDialogService);
  private readonly messageService = inject(MessageService);

  removeCartItem(listing: ItemListing) {
    this.confirmService
      .confirm(`Are you sure you want to remove ${listing.title} from your cart?`)
      .subscribe((confirmed) => {
        if (confirmed) {
          if (this.auth.isLoggedIn) {
            this.cartItemService.removeItemFromUserCart(this.auth.userId!, listing.id!).subscribe({
              next: () => this.messageService.info(`${listing.title} was removed.`),
              error: (err: HttpErrorResponse) => this.messageService.error(err.message),
            });
          } else {
            this.cartItemService
              .removeItemFromGuestCart(this.auth.guestId!, listing.id!)
              .subscribe({
                next: () => this.messageService.info(`${listing.title} was removed.`),
                error: (err: HttpErrorResponse) => this.messageService.error(err.message),
              });
          }
        }
      });
  }

  clearCart() {
    this.confirmService
      .confirm('Are you sure you want to clear your cart?')
      .subscribe((confirmed) => {
        if (confirmed) {
          if (this.auth.isLoggedIn) {
            this.cartItemService.clearUserCart(this.auth.userId!).subscribe({
              next: () => this.messageService.info('Your cart was cleared.'),
              error: (err: HttpErrorResponse) => this.messageService.error(err.message),
            });
          } else {
            this.cartItemService.clearGuestCart(this.auth.guestId!).subscribe({
              next: () => this.messageService.info('Your cart was cleared.'),
              error: (err: HttpErrorResponse) => this.messageService.error(err.message),
            });
          }
        }
      });
  }

  navigateCheckout() {
    this.router.navigate(['/checkout']);
  }

  get cartItems(): CartItem[] {
    return this.cartItemService.cartItems();
  }
}
