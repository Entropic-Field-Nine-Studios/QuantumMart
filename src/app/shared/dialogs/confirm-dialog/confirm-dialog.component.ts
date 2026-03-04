import { Component, inject } from '@angular/core';
import {
  MatDialogContent,
  MatDialogActions,
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatAnchor } from '@angular/material/button';

@Component({
  selector: 'app-confirm-dialog',
  imports: [MatDialogContent, MatDialogActions, MatAnchor, MatDialogModule],
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.scss',
  standalone: true,
})
export class ConfirmDialogComponent {
  public readonly data = inject<ConfirmDialogData>(MAT_DIALOG_DATA);

  private dialogRef = inject(MatDialogRef<ConfirmDialogComponent>);

  close(result: boolean) {
    this.dialogRef.close(result);
  }
}

export interface ConfirmDialogData {
  title: string;
  message: string;
  cancel: string;
  confirm: string;
}
