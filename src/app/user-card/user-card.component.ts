import { Component, inject, Input } from '@angular/core';
import {
  MatCardHeader,
  MatCard,
  MatCardSubtitle,
  MatCardTitle,
  MatCardAvatar,
} from '@angular/material/card';
import { User } from '../users/user.model';
import { UserStore } from '../core/stores/user.store';
import { MessageService } from '../shared/message/message.service';
import { Router } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';

@Component({
  selector: 'app-user-card',
  imports: [
    MatCardHeader,
    MatCard,
    MatCardSubtitle,
    MatCardTitle,
    CurrencyPipe,
    MatCardAvatar,
    MatIcon,
    MatIconButton,
    MatTooltip,
  ],
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

  navigateProfile() {
    this.router.navigate([`/profile/${this.user.id}`]);
  }

  get user(): User {
    return this.userStore.user()!;
  }
}
