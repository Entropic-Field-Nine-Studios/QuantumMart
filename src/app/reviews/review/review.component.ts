import { Component, Input } from '@angular/core';
import { Review } from '../review.model';
import { RatingDisplayComponent } from 'src/app/shared/display/rating-display/rating-display.component';
import { DateUtil } from 'src/app/shared/utils/date-util';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-review',
  imports: [RatingDisplayComponent, RouterLink],
  templateUrl: './review.component.html',
  styleUrl: './review.component.scss',
})
export class ReviewComponent {
  @Input({ required: true }) review!: Review;

  timestampDisplay(): string {
    return DateUtil.formatDistanceToNow(this.review.createdAt);
  }
}
