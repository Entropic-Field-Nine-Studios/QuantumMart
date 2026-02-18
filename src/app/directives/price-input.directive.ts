import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[priceInput]',
  standalone: true,
})
export class PriceInputDirective {
  constructor(private el: ElementRef<HTMLInputElement>) {}

  @HostListener('input', ['$event'])
  onInput(event: Event) {
    const input = this.el.nativeElement;

    // Remove all non-digits except decimal
    let raw = input.value.replace(/[^0-9.]/g, '');

    // Only allow one decimal point
    const parts = raw.split('.');
    if (parts.length > 2) {
      raw = parts[0] + '.' + parts.slice(1).join('');
    }

    // Format to money with 2 decimals if possible
    const num = parseFloat(raw);
    if (!isNaN(num)) {
      input.value = num.toFixed(2);
    } else {
      input.value = '';
    }
  }
}
