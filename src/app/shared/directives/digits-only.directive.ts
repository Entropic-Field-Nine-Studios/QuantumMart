import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: 'input[appDigitsOnly]',
  standalone: true,
})
export class DigitsOnlyDirective {
  private readonly pattern = /[^0-9]+/g;

  @HostListener('input', ['$event'])
  onInput(event: Event) {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(this.pattern, '');
  }
}
