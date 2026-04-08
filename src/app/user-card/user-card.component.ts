import { Component, inject } from '@angular/core';
import { User } from '../users/user.model';
import { UserStore } from '../core/stores/user.store';
import { MessageService } from '../shared/message/message.service';
import { Router } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector: 'app-user-card',
  imports: [CurrencyPipe, MatButtonModule, MatIcon, MatMenu, MatMenuItem, MatMenuTrigger],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss',
})
export class UserCardComponent {
  private readonly userStore = inject(UserStore);
  private readonly messageService = inject(MessageService);
  private readonly router = inject(Router);

  logout() {
    this.userStore.clear({ navigateLogin: true });
    this.messageService.info('You have been logged out.');
  }

  navigatePurchases() {
    this.router.navigate(['/purchases']);
  }

  navigateDashboard() {
    this.router.navigate(['/dashboard']);
  }

  navigateProfile() {
    this.router.navigate([`/profile/${this.user.id}`]);
  }

  navigateSettings() {
    this.router.navigate(['/account-settings']);
  }

  get user(): User {
    return this.userStore.user()!;
  }
}
