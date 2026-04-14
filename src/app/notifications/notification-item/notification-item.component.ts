import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Notification } from '../notification.model';
import { NotificationService } from '../notification.service';
import { Router } from '@angular/router';
import { DateUtil } from '../../shared/utils/date-util';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatMenuTrigger, MatMenu, MatMenuItem } from '@angular/material/menu';

@Component({
  selector: 'app-notification-item',
  imports: [MatButtonModule, MatIcon, MatMenuTrigger, MatMenu, MatMenuItem],
  templateUrl: './notification-item.component.html',
  styleUrl: './notification-item.component.scss',
})
export class NotificationItemComponent {
  @Input({ required: true }) notification!: Notification;

  /**
   * Emits when the user marks a notification as read.
   */
  @Output() markedAsRead = new EventEmitter<string>();

  /**
   * Emits when the user hides the notification.
   */
  @Output() markedHidden = new EventEmitter<string>();

  private readonly notifService = inject(NotificationService);
  private readonly router = inject(Router);

  open() {
    this.markAsRead();

    this.router.navigate([this.notification.route]);
  }

  markAsRead() {
    this.notifService.readNotification(this.notification.id!).subscribe({
      next: () => {
        this.notification.readAt = ''; // Update local state
        this.markedAsRead.emit(this.notification.id);
      },
    });
  }

  hide() {
    this.notifService.hideNotification(this.notification.id!).subscribe({
      next: () => this.markedHidden.emit(this.notification.id),
    });
  }

  get creationDate(): string {
    return DateUtil.formatDistanceToNow(this.notification.createdAt);
  }
}
