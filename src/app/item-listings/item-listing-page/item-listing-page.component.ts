import { Component, inject, OnInit, signal } from '@angular/core';
import { ItemListing } from '../item-listing.model';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from '../../shared/message/message.service';
import { ItemListingService } from '../item-listing.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatCardAvatar } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { CurrencyPipe } from '@angular/common';
import { AuthService } from '../../auth/auth.service';
import { CartItemService } from '../../cart/cart-item.service';
import { MatIcon } from '@angular/material/icon';
import { MatFabButton } from '@angular/material/button';

@Component({
  imports: [
    MatCardAvatar,
    MatGridListModule,
    MatProgressSpinner,
    CurrencyPipe,
    MatIcon,
    MatFabButton,
  ],
  templateUrl: './item-listing-page.component.html',
  styleUrl: './item-listing-page.component.scss',
})
export class ItemListingPageComponent implements OnInit {
  private itemListingService = inject(ItemListingService);
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);
  private messageService = inject(MessageService);
  private authService = inject(AuthService);
  private cartService = inject(CartItemService);
  listing = signal<ItemListing | null>(null);
  isListingCurrentUser = false;
  loggedIn = false;

  ngOnInit(): void {
    this.itemListingService
      .getListingById(this.activatedRoute.snapshot.params['listid'])
      .subscribe({
        next: (listing1) => {
          this.listing.set(listing1);
          this.isListingCurrentUser = this.authService.userId === listing1.sellerId;
          this.loggedIn = this.authService.isLoggedIn;
        },
        error: (err: HttpErrorResponse) => {
          switch (err.status) {
            case 400:
            case 404:
              this.router.navigate(['/404']);
              break;
            default:
              this.messageService.error(err.message);
          }
        },
      });
  }

  addToCart(): void {
    this.cartService.addItemToCart(this.authService.userId!, this.listing()!).subscribe({
      next: (item) => this.messageService.info(`${item.itemListing.title} was added to your cart.`),
      error: (err: HttpErrorResponse) =>
        this.messageService.error(`Couldn't add item: ${err.message}`),
    });
  }

  openCartDialog(): void {
    this.router.navigate(['/cart']);
  }

  navigateToUser() {
    this.router.navigate([`/profile/${this.listing()!.sellerId}`]);
  }

  get fullListing(): ItemListing | null {
    return this.listing();
  }
}
