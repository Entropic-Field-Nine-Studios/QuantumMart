import { Component, inject, Input, OnChanges, OnInit } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { ItemListing } from '../item-listing.model';
import { MatFabButton } from '@angular/material/button';
import { CartItemService } from '../../cart/cart-item.service';
import { AuthService } from '../../auth/auth.service';
import { MessageService } from '../../shared/message/message.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { ShortNumberPipe } from 'src/app/shared/pipes/short-number.pipe';
import { RatingDisplayComponent } from 'src/app/shared/display/rating-display/rating-display.component';

@Component({
  selector: 'app-item-listing',
  imports: [
    MatCardModule,
    CurrencyPipe,
    MatIcon,
    MatTooltip,
    MatFabButton,
    ShortNumberPipe,
    RatingDisplayComponent,
  ],
  templateUrl: './item-listing.component.html',
  styleUrl: './item-listing.component.scss',
})
export class ItemListingComponent implements OnInit, OnChanges {
  @Input({ required: true }) listing!: ItemListing;
  @Input() showUsername = true;

  loggedIn = false;
  isListingCurrentUser = false;

  private readonly cartService = inject(CartItemService);
  private readonly authService = inject(AuthService);
  private readonly messageService = inject(MessageService);
  private readonly router = inject(Router);

  ngOnInit(): void {
    this.loggedIn = this.authService.isLoggedIn;
    this.isListingCurrentUser = this.authService.userId === this.listing.sellerId;
  }

  ngOnChanges(): void {
    this.loggedIn = this.authService.isLoggedIn;
    this.isListingCurrentUser = this.authService.userId === this.listing.sellerId;
  }

  navigateToUser() {
    this.router.navigate([`/profile/${this.listing.sellerId}`]);
  }

  navigateToItem() {
    this.router.navigate([`/listing/${this.listing.id}`]);
  }

  addToCart(): void {
    this.cartService.addItemToCart(this.authService.userId!, this.listing).subscribe({
      next: (item) => this.messageService.info(`${item.itemListing.title} was added to your cart.`),
      error: (err: HttpErrorResponse) =>
        this.messageService.error(`Couldn't add item: ${err.message}`),
    });
  }
}
