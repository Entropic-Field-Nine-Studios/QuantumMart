import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'appShortNumber',
})
export class ShortNumberPipe implements PipeTransform {
  transform(value: number | null | undefined, decimals = 1): string {
    if (value === null || value === undefined || isNaN(value)) {
      return ''; // Quietly handle null values
    }

    if (Math.abs(value) < 1000) {
      return value.toString();
    }

    const units = ['K', 'M', 'B', 'T'];

    let unitIndex = -1;
    let num = value;

    while (Math.abs(num) >= 1000 && unitIndex < units.length - 1) {
      num /= 1000;
      unitIndex++;
    }

    return `${num.toFixed(decimals)}${units[unitIndex]}`;
  }
}
