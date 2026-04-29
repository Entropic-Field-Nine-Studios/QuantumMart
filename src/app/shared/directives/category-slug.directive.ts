import { Directive, HostListener } from '@angular/core';

/**
 * Directive for inputing category slugs.
 */
@Directive({
  selector: 'input[appSlug]',
})
export class CategorySlugDirective {
  private readonly pattern = /[^a-z0-9-]+/g;

  @HostListener('input', ['$event'])
  onInput(event: Event) {
    const input = event.target as HTMLInputElement;

    input.value = input.value.toLowerCase().replace(this.pattern, '');
  }
}
