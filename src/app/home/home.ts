import { Component, inject, OnInit } from '@angular/core';
import { ItemListingService } from '../item-listings/item-listing.service';
import { ItemListing } from '../item-listings/item-listing.model';
import { MatGridListModule } from '@angular/material/grid-list';
import { ItemListingComponent } from '../item-listings/item-listing/item-listing';
import { AuthService } from '../auth/auth.service';
import { MatFabButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { AddListingDialogComponent } from './add-listing-dialog/add-listing.dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CartDialogComponent } from './cart-dialog/cart-dialog';
import { CartItemService } from '../cart/cart-item.service';

@Component({
  selector: 'app-home',
  imports: [ItemListingComponent, MatGridListModule, MatFabButton, MatIconModule, MatTooltipModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class HomeComponent implements OnInit {
  listings: ItemListing[] = [];

  readonly dialog = inject(MatDialog);

  constructor(
    private authService: AuthService,
    private cartService: CartItemService,
    private itemListingService: ItemListingService,
  ) {}

  ngOnInit(): void {
    this.itemListingService.getAllListings().subscribe({
      next: (data) => (this.listings = data),
      error: (_) => (this.listings = []),
    });
  }

  openAddListingDialog(): void {
    const dialogRef = this.dialog.open(AddListingDialogComponent, {
      width: '600px',
      disableClose: true,
    });

    dialogRef.beforeClosed().subscribe((result) => {
      if (result === 'confirm-close') {
        // allow closing
      } else {
        // user cancelled the close
        dialogRef.disableClose = false;
      }
    });
  }

  openCartDialog(): void {
    this.cartService.getCartItemsByUserId(this.authService.userId!!).subscribe({
      next: (cartItems) => {
        this.dialog.open(CartDialogComponent, {
          width: '600px',
          height: cartItems.length > 0 ? '600px' : '200px',
          data: {
            cartItems: cartItems,
          },
        });
      },
      error: (_) => alert("Couldn't open cart!"),
    });
  }

  get loggedIn(): boolean {
    return this.authService.isLoggedIn;
  }
}
