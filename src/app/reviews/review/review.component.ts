import { Component, Input } from '@angular/core';
import { Review } from '../review.model';
import { RatingDisplayComponent } from 'src/app/shared/display/rating-display/rating-display.component';
import { DateUtil } from 'src/app/shared/utils/date-util';
import { RouterLink } from '@angular/router';
import { UserAvatarComponent } from 'src/app/shared/display/user-avatar/user-avatar.component';

@Component({
  selector: 'app-review',
  imports: [RatingDisplayComponent, RouterLink, UserAvatarComponent],
  templateUrl: './review.component.html',
  styleUrl: './review.component.scss',
})
export class ReviewComponent {
  @Input({ required: true }) review!: Review;

  timestampDisplay(): string {
    return DateUtil.formatDistanceToNow(this.review.createdAt);
  }
}
