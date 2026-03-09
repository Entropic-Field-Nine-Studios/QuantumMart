import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: 'input[appTitle]',
  standalone: true,
})
export class TitleDirective {
  private readonly pattern = /[^\p{L}\p{N}\s\-.'(),&/:+]/gu;

  @HostListener('input', ['$event'])
  onInput(event: Event) {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(this.pattern, '');
  }
}
