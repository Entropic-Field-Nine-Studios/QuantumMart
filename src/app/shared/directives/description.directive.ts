import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: 'textarea[appDescription]',
})
export class DescriptionDirective {
  private readonly pattern = /[^\p{L}\p{N}\s\-.'(),&/:+!?";%#\n]/gu;

  @HostListener('textarea', ['$event'])
  onInput(event: Event) {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(this.pattern, '');
  }
}
