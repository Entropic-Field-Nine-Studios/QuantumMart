import { inject } from '@angular/core';
import { AuthService } from './auth.service';

export function initGuestId() {
  const auth = inject(AuthService);

  if (!auth.isLoggedIn && auth.guestId == null) {
    auth.initGuestId();
  }
}
