import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: 'input[appCity]',
  standalone: true,
})
export class CityDirective {
  private readonly pattern = /[^\p{L}\p{Zs}\-.'()]/gu;

  @HostListener('input', ['$event'])
  onInput(event: Event) {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(this.pattern, '');
  }
}
