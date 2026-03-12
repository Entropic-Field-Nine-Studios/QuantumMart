import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

/**
 * A service for displaying snackbar-like messages on the screen.
 */
@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private readonly snackbar = inject(MatSnackBar);

  /**
   * Displays a green snackbar message at the bottom of the screen.
   *
   * @param message Text to display.
   */
  success(message: string) {
    this.snackbar.open(message, 'OK', {
      duration: this.determineDuration(message),
      panelClass: ['snackbar-success'],
      horizontalPosition: 'left',
      verticalPosition: 'bottom',
    });
  }

  /**
   * Displays a message as an error at the top of the screen. Automatically appends 'Error:' if
   * the message provided doesn't have it as a prefix.
   *
   * @param message Text to display.
   */
  error(message: string) {
    const modifiedMsg = message.startsWith('Error') ? message : `Error: ${message}`;

    this.snackbar.open(modifiedMsg, 'Dismiss', {
      duration: this.determineDuration(message),
      panelClass: ['snackbar-error'],
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

  /**
   * Displays a normal snackbar message at the bottom of the screen.
   *
   * @param message Text to display.
   */
  info(message: string) {
    this.snackbar.open(message, 'OK', {
      duration: this.determineDuration(message),
      panelClass: ['snackbar-info'],
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }

  private determineDuration(message: string): number {
    const base = 5000; // Minimum duration
    const perChar = 40; // Increment per character
    const max = 20000; // Maximum time allowed

    return Math.min(base + message.length * perChar, max);
  }
}
