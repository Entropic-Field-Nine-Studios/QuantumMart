import { Component, computed, Input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { ShortNumberPipe } from '../../pipes/short-number.pipe';

@Component({
  selector: 'app-rating-display',
  imports: [MatIcon, ShortNumberPipe],
  templateUrl: './rating-display.component.html',
  styleUrl: './rating-display.component.scss',
})
export class RatingDisplayComponent {
  @Input() rating = 0;
  @Input() count?: number;

  readonly fullStars = computed(() => Math.floor(this.rating));
  readonly hasHalf = computed(() => {
    const decimal = this.rating % 1;

    return decimal >= 0.25 && decimal <= 0.75;
  });

  readonly emptyStars = computed(() => 5 - this.fullStars() - (this.hasHalf() ? 1 : 0));
}
