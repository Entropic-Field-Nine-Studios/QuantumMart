import { Component, inject, signal } from '@angular/core';
import { MatTabsModule, MatTabNav } from '@angular/material/tabs';
import { Router, RouterOutlet, RouterLinkWithHref } from '@angular/router';
import { AuthService } from './auth/auth.service';
import {
  MatCard,
  MatCardTitle,
  MatCardHeader,
  MatCardAvatar,
  MatCardSubtitle,
} from '@angular/material/card';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    RouterLinkWithHref,
    MatTabsModule,
    MatTabNav,
    MatCard,
    MatCardTitle,
    MatCardHeader,
    MatCardAvatar,
    MatCardSubtitle,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  private router = inject(Router);
  private authService = inject(AuthService);

  protected readonly title = signal('QuantumMart');

  private readonly loginRegisterRoutes = ['/login', '/register'];

  get username(): string | null {
    return this.authService.username;
  }

  logout(): void {
    this.authService.logout();
  }

  profile(): void {
    this.router.navigate(['/profile/' + this.authService.userId]);
  }

  showUserCard(): boolean {
    return !this.loginRegisterRoutes.includes(this.router.url) && !this.isAtCheckout();
  }

  isAtCheckout(): boolean {
    return this.router.url.includes('/checkout');
  }
}
