import { Component, forwardRef, HostListener, Input } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  ValidationErrors,
  Validator,
} from '@angular/forms';
import { MatFormField, MatLabel, MatError, MatPrefix } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { DigitsOnlyDirective } from '../../directives/digits-only.directive';

@Component({
  selector: 'app-phone-input',
  imports: [
    MatFormField,
    MatLabel,
    MatInput,
    DigitsOnlyDirective,
    ReactiveFormsModule,
    MatError,
    MatPrefix,
  ],
  templateUrl: './phone-input.component.html',
  styleUrl: './phone-input.component.scss',
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PhoneInputComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => PhoneInputComponent),
      multi: true,
    },
  ],
  hostDirectives: [MatInput],
})
export class PhoneInputComponent implements ControlValueAccessor, Validator {
  @Input() required = false;

  @Input() label = 'Phone Number';

  errors: ValidationErrors | null = null;

  value = '';

  private onChange: (value: string) => void = () => {
    // No op
  };

  private onTouched = () => {
    // No op
  };

  // Called when the user types
  @HostListener('input', ['$event'])
  handleInput(event: Event) {
    const input = event.target as HTMLInputElement;

    const raw = this.stripNonDigits(input.value);
    const formatted = this.format(raw);

    this.value = formatted;
    this.onChange(raw);
  }

  @HostListener('blur')
  handleBlur() {
    this.onTouched();
  }

  writeValue(value: string | null): void {
    if (!value) {
      this.value = '';
      return;
    }

    this.value = this.format(value);
  }

  // Angular form validation
  validate(control: AbstractControl): ValidationErrors | null {
    const digits = this.stripNonDigits(control.value);

    if (this.required && digits.length === 0) {
      this.errors = { required: true };
      return this.errors;
    }

    if (digits.length !== 10) {
      this.errors = { phoneInvalid: true };
      return this.errors;
    }

    this.errors = null;
    return null;
  }

  // Required by ControlValueAccessor
  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  /**
   * Remove formatting characters.
   *
   * @param value String to format.
   * @returns Formatted string
   */
  private stripNonDigits(value: string): string {
    return value.replace(/\D+/g, '').slice(0, 10);
  }

  /**
   * Formats a string as (555) 123-4567.
   *
   * @param value String to format.
   * @returns Formatted string.
   */
  private format(value: string): string {
    const digits = this.stripNonDigits(value);

    if (digits.length <= 3) {
      return digits;
    }

    if (digits.length <= 6) {
      return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    }

    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  }
}
