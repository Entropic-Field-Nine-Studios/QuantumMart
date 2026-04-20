import { Component, forwardRef, signal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-rating-input',
  imports: [MatButtonModule, MatIcon],
  templateUrl: './rating-input.component.html',
  styleUrl: './rating-input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RatingInputComponent),
      multi: true,
    },
  ],
})
export class RatingInputComponent implements ControlValueAccessor {
  readonly stars = [1, 2, 3, 4, 5];

  readonly score = signal(0);
  readonly hover = signal(0);

  private readonly ratingText = ['Poor', 'Fair', 'Good', 'Very Good', 'Excellent'];

  private onChange: (value: number) => void = () => {
    // NO OP
  };

  private onTouched = () => {
    // NO OP
  };

  writeValue(value: number): void {
    this.score.set(value);
  }

  registerOnChange(fn: (value: number) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  mouseHover(value: number) {
    if (this.score() === 0) {
      this.hover.set(value);
    }
  }

  setScore(value: number) {
    this.score.set(value);
    this.hover.set(value);
    this.onChange(value);
    this.onTouched();
  }

  get scoreText(): string {
    if (this.score() === 0) {
      return ''; // No text
    } else {
      return this.ratingText[this.score() - 1];
    }
  }
}
