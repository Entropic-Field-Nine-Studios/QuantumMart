import { computed, inject, Injectable, signal } from '@angular/core';
import { User } from '../../users/user.model';
import { UserService } from '../../users/user.service';
import { AuthService } from '../../auth/auth.service';

@Injectable({ providedIn: 'root' })
export class UserStore {
  readonly user = computed(() => this._user());

  private readonly _user = signal<User | null>(null);
  private readonly userService = inject(UserService);
  private readonly authService = inject(AuthService);

  /**
   * Initializes the user store using the token in local storage.
   *
   * @returns
   */
  init() {
    const token = this.authService.rawToken;

    // User isn't logged in - prevent redirect and just clear
    if (!token) {
      this.clear();
      return;
    }

    if (!this.authService.isTokenValid()) {
      this.clear({ navigateLogin: true });
      return;
    }

    this.userService.getCurrentUser().subscribe({
      next: (userInfo) => this._user.set(userInfo),
      error: () => this.clear(),
    });
  }

  /**
   * Removes user data and calls the logout method from auth service.
   */
  clear(options?: { navigateLogin?: boolean }) {
    this._user.set(null);
    this.authService.logout(options?.navigateLogin ?? false);
  }
}
