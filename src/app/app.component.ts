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
import { NotFoundComponent } from './not-found/not-found.component';
import { UserStore } from './core/stores/user.store';
import { CurrencyPipe } from '@angular/common';
import { User } from './users/user.model';

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
    CurrencyPipe,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  private router = inject(Router);
  private authService = inject(AuthService);
  private userStore = inject(UserStore);

  protected readonly title = signal('QuantumMart');

  private readonly loginRegisterRoutes = ['/login', '/register'];

  getUser(): User | null {
    return this.userStore.user();
  }

  logout(): void {
    this.userStore.clear({ navigateLogin: true });
  }

  profile(): void {
    this.router.navigate(['/profile/' + this.authService.userId]);
  }

  showUserCard(): boolean {
    return (
      !this.loginRegisterRoutes.includes(this.router.url) && !this.isAtCheckout() && !this.isAt404()
    );
  }

  showNavTabs(): boolean {
    return !this.isAtCheckout() && !this.isAt404();
  }

  private isAtCheckout(): boolean {
    return this.router.url.includes('/checkout');
  }

  private isAt404(): boolean {
    return this.router.routerState.snapshot.root.firstChild?.component === NotFoundComponent;
  }
}
