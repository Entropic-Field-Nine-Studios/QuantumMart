import { formatDate } from '@angular/common';
import { Injectable, LOCALE_ID, Inject } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DateService {
  constructor(@Inject(LOCALE_ID) private locale: string) {}

  formatDate(date: Date): string {
    return date.getMonth() + 1 + '/' + date.getDate() + '/' + date.getFullYear();
  }
}
