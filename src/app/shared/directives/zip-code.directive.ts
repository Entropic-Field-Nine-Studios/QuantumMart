import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: 'input[appZipCode]',
  standalone: true,
})
export class ZipCodeDirective {
  private readonly pattern = /[^0-9-]/g;

  @HostListener('input', ['$event'])
  onInput(event: Event) {
    const input = event.target as HTMLInputElement;
    let cleaned = input.value.replace(this.pattern, '');

    // Prevent multiple hyphens
    cleaned = cleaned.replace(/-+/g, '-');

    // Prevent hypen in wrong place
    if (cleaned.length > 5 && cleaned[5] !== '-') {
      cleaned = cleaned.slice(0, 5) + '-' + cleaned.slice(5);
    }

    // Enforce max characters of 10
    cleaned = cleaned.slice(0, 10);

    input.value = cleaned;
  }
}
