import { Component, computed, inject, OnInit, signal } from '@angular/core';
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
import { MatFabButton, MatIconButton } from '@angular/material/button';
import { MatTooltip } from '@angular/material/tooltip';
import { Title } from '@angular/platform-browser';
import { qmTitle } from '../../title/qm-title';
import { DecimalPipe } from '@angular/common';
import { CreateReviewComponent } from 'src/app/reviews/create-review/create-review.component';
import { ReviewService } from 'src/app/reviews/review.service';
import { Review } from 'src/app/reviews/review.model';
import { ReviewComponent } from 'src/app/reviews/review/review.component';
import { RatingDisplayComponent } from 'src/app/shared/display/rating-display/rating-display.component';

@Component({
  imports: [
    MatCardAvatar,
    MatGridListModule,
    MatProgressSpinner,
    CurrencyPipe,
    MatIcon,
    MatFabButton,
    MatIconButton,
    MatTooltip,
    DecimalPipe,
    CreateReviewComponent,
    ReviewComponent,
    RatingDisplayComponent,
  ],
  templateUrl: './item-listing-page.component.html',
  styleUrl: './item-listing-page.component.scss',
})
export class ItemListingPageComponent implements OnInit {
  private readonly itemListingService = inject(ItemListingService);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly messageService = inject(MessageService);
  private readonly authService = inject(AuthService);
  private readonly cartService = inject(CartItemService);
  private readonly reviewService = inject(ReviewService);
  private title = inject(Title);

  readonly listing = signal<ItemListing | null>(null);

  readonly reviews = signal<Review[]>([]);

  readonly userHasReview = computed(
    () => this.reviews().filter((review) => review.userId === this.authService.userId).length >= 1,
  );

  isListingCurrentUser = false;
  loggedIn = false;

  ngOnInit(): void {
    this.itemListingService
      .getListingById(this.activatedRoute.snapshot.params['listid'])
      .subscribe({
        next: (listing1) => {
          this.listing.set(listing1);
          this.title.setTitle(qmTitle(listing1.title));
          this.isListingCurrentUser = this.authService.userId === listing1.sellerId;
          this.loggedIn = this.authService.isLoggedIn;

          this.loadReviews();
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

  loadReviews() {
    this.reviewService.getListingReviews(this.listing()!.id!).subscribe({
      next: (reviews) => this.reviews.set(reviews),
    });
  }

  addToCart(): void {
    this.cartService.addItemToCart(this.authService.userId!, this.listing()!).subscribe({
      next: (item) => this.messageService.info(`${item.itemListing.title} was added to your cart.`),
      error: (err: HttpErrorResponse) =>
        this.messageService.error(`Couldn't add item: ${err.message}`),
    });
  }

  navigateToUser() {
    this.router.navigate([`/profile/${this.listing()!.sellerId}`]);
  }

  navigateEdit() {
    this.router.navigate(['edit'], { relativeTo: this.activatedRoute });
  }

  get fullListing(): ItemListing | null {
    return this.listing();
  }
}
