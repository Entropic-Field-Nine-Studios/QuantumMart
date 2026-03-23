import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Component, inject, OnInit, signal } from '@angular/core';
import { ItemListing } from '../item-listing.model';
import { ActivatedRoute, Router } from '@angular/router';
import { DateService } from '../../date/date.service';
import { User } from '../../users/user.model';
import { UserService } from '../../users/user.service';
import { MessageService } from '../../shared/message/message.service';
import { ItemListingService } from '../item-listing.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatCard, MatCardTitle, MatCardHeader, MatCardAvatar } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { ItemListingListComponent } from '../item-listing-list/item-listing-list.component';
import { CurrencyPipe } from '@angular/common';
import { AuthService } from '../../auth/auth.service';
import { CartItemService } from '../../cart/cart-item.service';
import { MatIcon } from '@angular/material/icon';
import { MatFabButton } from '@angular/material/button';

@Component({
  imports: [
    MatCard,
    MatCardTitle,
    MatCardHeader,
    MatCardAvatar,
    MatGridListModule,
    MatProgressSpinner,
    ItemListingListComponent,
    CurrencyPipe,
    MatIcon,
    MatFabButton,
  ],
  templateUrl: './item-listing-page.component.html',
  styleUrl: './item-listing-page.component.scss',
})
export class ItemListingPageComponent implements OnInit {
  private userService = inject(UserService);
  private itemListingService = inject(ItemListingService);
  private dateService = inject(DateService);
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);
  private messageService = inject(MessageService);
  private authService = inject(AuthService);
  private cartService = inject(CartItemService);
  user = signal<User | null>(null);
  sDateCreated!: string;
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
          this.userService.getUserById(listing1.sellerId ?? '').subscribe({
            next: (data) => this.user.set(data),
          });
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

  ngOnChanges(): void {
    this.loggedIn = this.authService.isLoggedIn;
    this.isListingCurrentUser = this.authService.userId === this.listing()!.sellerId;
  }

  addToCart(): void {
    this.cartService.addItemToCart(this.authService.userId!, this.listing()!).subscribe({
      next: (item) => this.messageService.info(`${item.itemListing.title} was added to your cart.`),
      error: (err: HttpErrorResponse) =>
        this.messageService.error(`Couldn't add item: ${err.message}`),
    });
  }

  openAddListingDialog(): void {
    this.router.navigate(['/create-listing']);
  }

  openCartDialog(): void {
    this.router.navigate(['/cart']);
  }

  navigateToUser() {
    this.router.navigate([`/profile/${this.listing()!.sellerId}`]);
  }
}
