import { Component, forwardRef, HostListener, Input } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
} from '@angular/forms';
import { MatInput, MatFormField, MatLabel, MatPrefix, MatError } from '@angular/material/input';
import { MoneyInputDirective } from '../../directives/money.directive';

@Component({
  selector: 'app-price-input',
  imports: [MatFormField, MatLabel, MatPrefix, MatInput, MoneyInputDirective, MatError],
  templateUrl: './price-input.component.html',
  styleUrl: './price-input.component.scss',
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

  rawValue = '0.00';
  value = 0.0;
  errors: ValidationErrors | null = null;
  isFocused = false;

  private onChange: (value: string) => void = () => {
    // No op
  };

  private onTouched = () => {
    // No op
  };

  @HostListener('focusin')
  onFocusIn() {
    this.isFocused = true;
  }

  @HostListener('focusout')
  onFocusOut() {
    this.isFocused = false;
    this.onTouched();
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;
    const raw = input.value.replace(/,/g, '');
    const [num] = raw.split('.');

    const isDigit = event.key >= '0' && event.key <= '9';

    if (isDigit && num.length >= 5 && !raw.includes('.')) {
      event.preventDefault();
    }
  }

  @HostListener('paste', ['$event'])
  onPaste(event: ClipboardEvent) {
    const input = event.target as HTMLInputElement;
    const pasted = event.clipboardData?.getData('text') ?? '';

    // Strip commas, currency symbols, spaces
    const cleaned = pasted.replace(/[^0-9.]/g, '');

    // Reject if more than one decimal
    if ((cleaned.match(/\./g) || []).length > 1) {
      event.preventDefault();
      return;
    }

    const [int, dec] = cleaned.split('.');

    // Reject if too many integer digits
    if (int.length > 6) {
      event.preventDefault();
      return;
    }

    // Reject if too many decimal digits
    if (dec && dec.length > 2) {
      event.preventDefault();
      return;
    }

    // If valid, replace the input with the cleaned value
    event.preventDefault();
    this.rawValue = this.formatDisplay(cleaned);
    input.value = this.rawValue;
  }

  @HostListener('input', ['$event'])
  handleInput(event: Event) {
    const input = event.target as HTMLInputElement;
    const cleaned = input.value.replace(/,/g, '');

    this.rawValue = this.formatDisplay(cleaned);
    input.value = this.rawValue;

    this.setCursorToEnd(input);

    this.onChange(input.value);
  }

  setCursorToEnd(input: HTMLInputElement) {
    const len = input.value.length;
    input.setSelectionRange(len, len);
  }

  handleBlur() {
    if (!this.rawValue || this.rawValue.trim() === '') {
      this.rawValue = '0.00';
      this.onChange(this.rawValue);
    }

    this.onTouched();
  }

  writeValue(value: string | null): void {
    if (!value) {
      this.rawValue = '0.00';
      return;
    }

    this.rawValue = value;
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  validate(control: AbstractControl): ValidationErrors | null {
    const inputPrice = Number.parseFloat(control.value.replace(/,/g, ''));

    if (this.required && inputPrice < 0.01) {
      this.errors = { required: true };
      return this.errors;
    }

    this.errors = null;
    return null;
  }

  private formatDisplay(value: string): string {
    if (!value) return '';

    const [int, dec] = value.split('.');

    const formattedInt = Number(int).toLocaleString();

    if (dec === undefined || !value.includes('.')) {
      return formattedInt;
    }

    if (dec === '') {
      return formattedInt + '.';
    }

    return formattedInt + '.' + dec;
  }
}
