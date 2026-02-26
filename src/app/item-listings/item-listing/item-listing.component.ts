import { Component, inject, Input, OnInit } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { ItemListing } from '../item-listing.model';
import { MatAnchor } from '@angular/material/button';
import { CartItemService } from '../../cart/cart-item.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-item-listing',
  imports: [MatCardModule, CurrencyPipe, MatAnchor],
  templateUrl: './item-listing.component.html',
  styleUrl: './item-listing.component.scss',
})
export class ItemListingComponent implements OnInit {
  @Input({ required: true }) listing!: ItemListing;

  loggedIn = false;
  isListingCurrentUser = false;

  private cartService = inject(CartItemService);
  private authService = inject(AuthService);

  ngOnInit(): void {
    this.loggedIn = this.authService.isLoggedIn;
    this.isListingCurrentUser = this.authService.userId == this.listing.sellerId;
  }

  addToCart(): void {
    this.cartService.addItemToCart(this.authService.userId!, this.listing).subscribe({
      next: (item) => alert(`${item.itemListing.title} was added to your cart.`),
      error: () => alert('Unable to add item to cart.'),
    });
  }
}
