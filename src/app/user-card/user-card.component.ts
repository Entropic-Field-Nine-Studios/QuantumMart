import { Component, computed, effect, inject, signal } from '@angular/core';
import { User } from '../users/user.model';
import { UserStore } from '../core/stores/user.store';
import { MessageService } from '../shared/message/message.service';
import { Router } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { MatTooltip } from '@angular/material/tooltip';
import { MatBadgeModule } from '@angular/material/badge';
import { NotificationService } from '../notifications/notification.service';
import { Notification } from '../notifications/notification.model';
import { NotificationItemComponent } from '../notifications/notification-item/notification-item.component';
import { CartItemService } from '../cart/cart-item.service';

@Component({
  selector: 'app-user-card',
  imports: [
    CurrencyPipe,
    MatButtonModule,
    MatIcon,
    MatMenu,
    MatMenuItem,
    MatMenuTrigger,
    MatTooltip,
    MatBadgeModule,
    NotificationItemComponent,
  ],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss',
})
export class UserCardComponent {
  private readonly userStore = inject(UserStore);
  private readonly messageService = inject(MessageService);
  private readonly router = inject(Router);
  private readonly notifService = inject(NotificationService);
  private readonly cartService = inject(CartItemService);

  readonly notifications = signal<Notification[] | null>(null);
  readonly notificationTotal = computed(
    () => this.notifications()?.filter((n) => n.readAt === null).length ?? 0,
  );

  constructor() {
    effect(() => {
      const user = this.userStore.user();
      if (!user) return;

      this.notifService.getNotifications(user.id).subscribe({
        next: (n) => this.notifications.set(n),
        error: () => this.notifications.set([]),
      });
    });
  }

  /**
   * Marks the emitted notification ID as read.
   *
   * @param id Notification ID
   */
  lowerNotifBadgeCount(id: string) {
    this.notifications.update(
      (notifs) =>
        notifs?.map((item) => {
          if (item.id === id) {
            item.readAt = ''; // Local update
          }

          return item;
        }) ?? [],
    );
  }

  hideNotif(id: string) {
    this.notifications.update((notifs) => notifs?.filter((item) => item.id != id) ?? []);
  }

  logout() {
    this.userStore.clear({ navigateLogin: true });
    this.messageService.info('You have been logged out.');
  }

  navigateTo(route: string) {
    this.router.navigate([`/${route}`]);
  }

  navigateProfile() {
    this.router.navigate([`/profile/${this.user.id}`]);
  }

  get totalCartItems(): number {
    return this.cartService.cartCount();
  }

  get user(): User {
    return this.userStore.user()!;
  }
}
