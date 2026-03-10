import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: 'input[appMoneyInput]',
  standalone: true,
})
export class MoneyInputDirective {
  @HostListener('input', ['$event'])
  onInput(event: Event) {
    const input = event.target as HTMLInputElement;
    let value = input.value;

    // Remove all characters except digits and decimal
    value = value.replace(/[^0-9.]/g, '');

    // Allow only one decimal
    const parts = value.split('.');
    if (parts.length > 2) {
      value = parts[0] + '.' + parts.slice(1).join('').replace(/\./g, '');
    }

    // Limit to two decimal places
    if (parts[1]) {
      parts[1] = parts[1].slice(0, 2);
      value = parts[0] + '.' + parts[1];
    }

    input.value = value;
  }
}
