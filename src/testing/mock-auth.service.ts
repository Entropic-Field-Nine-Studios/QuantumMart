import { signal } from '@angular/core';

/**
 * Mocks the authentication class for testing.
 *
 * @property {Signal<number>} authChanged - Reactive counter that increments on login/logout.
 * @property {string | null} userId - The mocked logged-in user's UUID.
 * @property {boolean} isLoggedIn - Whether the mock user is considered logged in.
 */
export class MockAuthService {
  authChanged = signal(0);
  userId: string | null;
  isLoggedIn: boolean;

  constructor(userId: string | null = null) {
    this.userId = userId;
    this.isLoggedIn = userId != null;
  }
}
