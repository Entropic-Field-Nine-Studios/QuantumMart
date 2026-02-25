import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: 'input[appAddress]',
  standalone: true,
})
export class AddressDirective {
  private readonly pattern = /[^\p{L}\p{N}\p{Zs}\-.,'#/&()]/gu;

  @HostListener('input', ['$event'])
  onInput(event: Event) {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(this.pattern, '');
  }
}
