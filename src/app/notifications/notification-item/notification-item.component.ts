import { Component, inject, Input } from '@angular/core';
import { Notification } from '../notification.model';
import { NotificationService } from '../notification.service';
import { Router } from '@angular/router';
import { DateUtil } from '../../shared/utils/date-util';

@Component({
  selector: 'app-notification-item',
  imports: [],
  templateUrl: './notification-item.component.html',
  styleUrl: './notification-item.component.scss',
})
export class NotificationItemComponent {
  @Input({ required: true }) notification!: Notification;

  private readonly notifService = inject(NotificationService);
  private readonly router = inject(Router);

  open() {
    this.notifService.readNotification(this.notification.id!).subscribe({
      next: () => (this.notification.readAt = ''), // Update local state
    });
    this.router.navigate([this.notification.route]);
  }

  get creationDate(): string {
    return DateUtil.formatDistanceToNow(this.notification.createdAt);
  }
}
