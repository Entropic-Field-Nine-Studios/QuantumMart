import { inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import {
  ConfirmDialogComponent,
  ConfirmDialogData,
} from './confirm-dialog/confirm-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class ConfirmDialogService {
  private dialog = inject(MatDialog);

  /**
   * Prompts the user a confirmation dialog.
   *
   * @param message Text to show in the dialog content.
   * @param title Dialog title (default: 'Confirmation')
   * @param confirmBtn Text for the confirm button (default: 'Confirm')
   * @param cancelBtn Text for the cancel button (default: 'Cancel')
   * @returns Observable answering if the user wants to proceed.
   */
  confirm(
    message: string,
    title = 'Confirmation',
    confirmBtn = 'Confirm',
    cancelBtn = 'Cancel',
  ): Observable<boolean> {
    const data: ConfirmDialogData = {
      title: title,
      message: message,
      confirm: confirmBtn,
      cancel: cancelBtn,
    };

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: data,
      width: '400px',
      disableClose: true,
    });

    return dialogRef.afterClosed();
  }
}
