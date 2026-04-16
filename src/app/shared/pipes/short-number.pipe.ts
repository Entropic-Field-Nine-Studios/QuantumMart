import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'appShortNumber',
})
export class ShortNumberPipe implements PipeTransform {
  /**
   * Shortens a number as a string. Leading zeros are omitted.
   *
   * Examples:
   * - 1,001 with 1 decimal becomes 1k
   * - 1,293,481 with 2 decimals becomes 1.29m
   *
   * @param value Number to format
   * @param decimals Amount of decimals to use (default 1)
   * @returns
   */
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

    return `${this.truncate(num, decimals)}${units[unitIndex]}`;
  }

  private truncate(value: number, decimals: number): number {
    const factor = Math.pow(10, decimals);

    return Math.floor(value * factor) / factor;
  }
}
