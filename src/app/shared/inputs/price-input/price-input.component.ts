import { Component, forwardRef, HostListener, Input } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
} from '@angular/forms';
import { MatInput, MatFormField, MatLabel, MatPrefix } from '@angular/material/input';
import { DigitsOnlyDirective } from '../../directives/digits-only.directive';
import { MoneyInputDirective } from '../../directives/money.directive';

@Component({
  selector: 'app-price-input',
  imports: [MatFormField, MatLabel, MatPrefix, MatInput, MoneyInputDirective],
  templateUrl: './price-input.component.html',
  styleUrl: './price-input.component.scss',
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PriceInputComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => PriceInputComponent),
      multi: true,
    },
  ],
  hostDirectives: [MatInput],
})
export class PriceInputComponent implements ControlValueAccessor, Validator {
  @Input() required = false;
  @Input() label = 'Price';

  value = 0.0;
  errors: ValidationErrors | null = null;

  private onChange: (value: string) => void = () => {
    // No op
  };

  private onTouched = () => {
    // No op
  };

  @HostListener('input', ['$event'])
  handleInput(event: Event) {
    const input = event.target as HTMLInputElement;

    this.onChange(input.value);
  }

  @HostListener('blur')
  handleBlur() {
    this.onTouched();
  }

  writeValue(value: string | null): void {
    if (!value) {
      this.value = '0.00';
      return;
    }

    this.value = this.format(value);
  }

  registerOnChange(fn: any): void {
    throw new Error('Method not implemented.');
  }

  registerOnTouched(fn: any): void {
    throw new Error('Method not implemented.');
  }

  validate(control: AbstractControl): ValidationErrors | null {
    throw new Error('Method not implemented.');
  }
}
