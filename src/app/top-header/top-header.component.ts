import { Component, inject } from '@angular/core';
import { Router, RouterLinkWithHref, RouterLinkActive } from '@angular/router';
import { User } from '../users/user.model';
import { UserStore } from '../core/stores/user.store';
import { NotFoundComponent } from '../not-found/not-found.component';
import { UserCardComponent } from '../user-card/user-card.component';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-top-header',
  imports: [RouterLinkWithHref, UserCardComponent, MatTabsModule, RouterLinkActive],
  templateUrl: './top-header.component.html',
  styleUrl: './top-header.component.scss',
})
export class TopHeaderComponent {
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
    return !this.isAtCheckout() && !this.isAt404();
  }

  isAtCheckout(): boolean {
    return this.router.url.includes('/checkout');
  }

  private isAt404(): boolean {
    return this.router.routerState.snapshot.root.firstChild?.component === NotFoundComponent;
  }
}
