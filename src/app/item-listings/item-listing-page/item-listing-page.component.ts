import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { ItemListing } from '../item-listing.model';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ItemListingService } from '../item-listing.service';
import { MatGridListModule } from '@angular/material/grid-list';
import { AuthService } from '../../auth/auth.service';
import { ReviewService } from 'src/app/reviews/review.service';
import { Review } from 'src/app/reviews/review.model';
import { NotFoundComponent } from 'src/app/not-found/not-found.component';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { RatingDisplayComponent } from 'src/app/shared/display/rating-display/rating-display.component';
import { DatePipe, DecimalPipe } from '@angular/common';
import { CreateReviewComponent } from 'src/app/reviews/create-review/create-review.component';
import { ReviewComponent } from 'src/app/reviews/review/review.component';
import { Title } from '@angular/platform-browser';
import { qmTitle } from 'src/app/title/qm-title';
import { CartItemService } from 'src/app/cart/cart-item.service';
import { MessageService } from 'src/app/shared/message/message.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { AddCartItemRequest } from 'src/app/cart/add-cart-item-request.model';

@Component({
  imports: [
    MatGridListModule,
    NotFoundComponent,
    MatProgressSpinner,
    RatingDisplayComponent,
    DecimalPipe,
    DatePipe,
    CreateReviewComponent,
    ReviewComponent,
    MatButtonModule,
    MatIcon,
    MatTooltip,
    RouterLink,
  ],
  templateUrl: './item-listing-page.component.html',
  styleUrl: './item-listing-page.component.scss',
})
export class ItemListingPageComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly itemListingService = inject(ItemListingService);
  private readonly reviewService = inject(ReviewService);
  private readonly auth = inject(AuthService);
  private readonly title = inject(Title);
  private readonly cartService = inject(CartItemService);
  private readonly messageService = inject(MessageService);
  private readonly router = inject(Router);

  private readonly _listing = signal<ItemListing | null>(null);
  private readonly _reviews = signal<Review[]>([]);

  readonly notFound = signal(false);

  ngOnInit(): void {
    this.listenForRouteParams();
  }

  get reviews(): Review[] {
    return this._reviews();
  }

  get listing(): ItemListing | null {
    return this._listing();
  }

  private readonly userHasReviewed = computed(() =>
    this._reviews().some((r) => r.userId === this.auth.userId),
  );

  readonly userOwnsListing = computed(() => this._listing()?.sellerId === this.auth.userId);

  navigateEdit() {
    this.router.navigate(['edit'], { relativeTo: this.activatedRoute });
  }

  userCanAddToCart(): boolean {
    if (!this.auth.isLoggedIn) {
      return false;
    }

    return !this.userOwnsListing();
  }

  addToCart() {
    if (!this.userCanAddToCart()) return;

    const userId = this.auth.userId!;

    const addItemRequest: AddCartItemRequest = {
      userId: userId,
      guestSessionId: null, // TODO: Guest checkout
      listingInfo: this.listing!,
      itemQuantity: 1,
    };

    this.cartService.addItemToCart(addItemRequest).subscribe({
      next: () => this.messageService.info(`${this.listing?.title} was added to your cart.`),
      error: (err: HttpErrorResponse) => this.messageService.error(err.message),
    });
  }

  /** Checks if the logged-in user can leave a review on this listing. */
  userCanWriteReview(): boolean {
    if (!this.auth.isLoggedIn) {
      return false;
    }

    return !this.userHasReviewed() && !this.userOwnsListing();
  }

  private loadListing(listingId: string) {
    this.itemListingService.getListingById(listingId).subscribe({
      next: (listing) => {
        this._listing.set(listing);
        this.title.setTitle(qmTitle(listing.title));
        this.loadReviews(listingId);
      },
      error: () => this.notFound.set(true),
    });
  }

  private loadReviews(listingId: string) {
    this.reviewService
      .getListingReviews(listingId)
      .subscribe((reviews) => this._reviews.set(reviews));
  }

  private listenForRouteParams() {
    this.activatedRoute.paramMap.subscribe((params) => {
      const id = params.get('listid');

      if (id) {
        this.loadListing(id);
      }
    });
  }
}
