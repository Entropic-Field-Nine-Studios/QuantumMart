import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: 'input[appPersonName]',
  standalone: true,
})
export class PersonNameDirective {
  private readonly pattern = /[^\p{L} ]/gu;

  @HostListener('input', ['$event'])
  onInput(event: Event) {
    const input = event.target as HTMLInputElement;

    // Remove invalid characters
    let cleaned = input.value.replace(this.pattern, '');

    // Collapse multiple spaces
    cleaned = cleaned.replace(/\s+/g, ' ');

    // Trim leading/trailing spaces
    cleaned = cleaned.trimStart();

    input.value = cleaned;
  }
}
