import { Component, inject, signal } from '@angular/core';
import { MatTabsModule, MatTabNav } from '@angular/material/tabs';
import { Router, RouterOutlet, RouterLinkWithHref } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { UserStore } from './core/stores/user.store';
import { User } from './users/user.model';
import { UserCardComponent } from './user-card/user-card.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLinkWithHref, MatTabsModule, MatTabNav, UserCardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  protected readonly title = signal('QuantumMart');

  private readonly loginRegisterRoutes = ['/login', '/register'];

  private readonly router = inject(Router);
  private readonly userStore = inject(UserStore);

  get user(): User | null {
    return this.userStore.user();
  }

  showUserCard(): boolean {
    return (
      !this.loginRegisterRoutes.includes(this.router.url) && !this.isAtCheckout() && !this.isAt404()
    );
  }

  showNavTabs(): boolean {
    return !this.isAtCheckout() && !this.isAt404() && !this.isAtSettings();
  }

  private isAtCheckout(): boolean {
    return this.router.url.includes('/checkout');
  }

  private isAt404(): boolean {
    return this.router.routerState.snapshot.root.firstChild?.component === NotFoundComponent;
  }

  private isAtSettings(): boolean {
    return this.router.url.includes('/account-settings');
  }
}
