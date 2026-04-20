import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { ReviewService } from '../review.service';
import { AuthService } from 'src/app/auth/auth.service';
import { CreateReviewRequest } from './create-review-request.model';
import { MessageService } from 'src/app/shared/message/message.service';
import { ItemListing } from 'src/app/item-listings/item-listing.model';
import { HttpErrorResponse } from '@angular/common/http';
import { Review } from '../review.model';
import { MatInput } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAnchor } from '@angular/material/button';
import { RatingInputComponent } from 'src/app/shared/inputs/rating-input/rating-input.component';

@Component({
  selector: 'app-create-review',
  imports: [MatFormField, MatLabel, MatInput, ReactiveFormsModule, MatAnchor, RatingInputComponent],
  templateUrl: './create-review.component.html',
  styleUrl: './create-review.component.scss',
})
export class CreateReviewComponent {
  @Input({ required: true }) listing!: ItemListing;

  readonly createReviewForm = new FormGroup({
    body: new FormControl('', Validators.required),
    score: new FormControl(0, Validators.required),
  });

  @Output() reviewCreated = new EventEmitter<Review>();

  private readonly reviewService = inject(ReviewService);
  private readonly auth = inject(AuthService);
  private readonly messageService = inject(MessageService);

  submitForm() {
    if (this.createReviewForm.valid && this.auth.isLoggedIn) {
      const values = this.createReviewForm.value!;

      const req: CreateReviewRequest = {
        body: values.body!,
        score: values.score!,
      };

      this.reviewService.createReview(this.listing.id!, req).subscribe({
        next: (review) => {
          this.messageService.success('Review submitted.');
          this.reviewCreated.emit(review);
        },
        error: (err: HttpErrorResponse) => this.messageService.error(err.message),
      });
    }
  }

  formValid(): boolean {
    const score = this.createReviewForm.value.score;

    return this.createReviewForm.valid && score !== null && score !== 0;
  }
}
