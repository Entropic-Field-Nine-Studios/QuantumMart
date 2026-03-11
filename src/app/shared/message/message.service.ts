import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

const DEFAULT_DURATION_MS = 15000;

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private readonly snackbar = inject(MatSnackBar);

  success(message: string) {
    this.snackbar.open(message, 'OK', {
      duration: DEFAULT_DURATION_MS,
      panelClass: ['snackbar-success'],
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }

  error(message: string) {
    this.snackbar.open(message, 'Dismiss', {
      duration: DEFAULT_DURATION_MS,
      panelClass: ['snackbar-error'],
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }

  info(message: string) {
    this.snackbar.open(message, 'OK', {
      duration: DEFAULT_DURATION_MS,
      panelClass: ['snackbar-info'],
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }
}
