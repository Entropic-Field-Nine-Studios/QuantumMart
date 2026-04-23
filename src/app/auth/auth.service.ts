import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginResponse } from './login-response.model';
import { jwtDecode } from 'jwt-decode';
import { JwtPayload } from './jwt-payload.model';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly baseUrl = `${environment.apiUrl}/auth`;

  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);

  private readonly _authChanged = signal(0);

  /** Fires whenever authentication changes. Useful for signal events needing to listen for login information. */
  readonly authChanged = this._authChanged.asReadonly();

  /**
   * Attempts to validate the provided credentials against an existing user in the database.
   *
   * ### Error codes
   * - 400 (Bad Request) - If ANY of the parameters are mismatched.
   *
   * @param username User to login as.
   * @param rawPassword Password of the user.
   * @returns A login response which holds a brand-new Java Web Token and the user's username.
   */
  login(username: string, rawPassword: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.baseUrl}/login`, { username, rawPassword });
  }

  /**
   * Removes token and username information from browser storage.
   *
   * @param navigateLogin If the application should route the user to the login page (default `true`).
   */
  logout(navigateLogin = true): void {
    this.storage?.removeItem('token');

    if (this.guestId === null) {
      this.initGuestId();
    }

    this._authChanged.update((n) => n + 1);

    if (navigateLogin) {
      this.router.navigate(['/login']);
    }
  }

  /**
   * Sets the token for the browser session.
   *
   * @param token Token to set.
   */
  setToken(token: string) {
    this.storage?.setItem('token', token);
    this.clearGuestId();
    this._authChanged.update((n) => n + 1);
  }

  private get storage() {
    return typeof window !== 'undefined' ? window.localStorage : null;
  }

  /**
   * Gets the currently logged in user's username, or `null` if the client isn't logged in.
   */
  get username(): string | null {
    return this.decodedToken?.sub ?? null;
  }

  /**
   * Checks if the client is currently logged in (aka, token is valid).
   */
  get isLoggedIn(): boolean {
    return this.isTokenValid();
  }

  /**
   * Gets the UUID associated with the current non-user. Returns null if a client is logged in.
   */
  get guestId(): string | null {
    return this.storage?.getItem('guestId') ?? null;
  }

  /**
   * Gets the logged in user's UUID, or `null` if the client isn't logged in.
   */
  get userId(): string | null {
    return this.decodedToken?.uid ?? null;
  }

  /**
   * Retrieves the logged in user's level of privilege, or `null` if the client isn't logged in.
   */
  get userRole(): string | null {
    return this.decodedToken?.role ?? null;
  }

  /**
   * Checks if the token within browser storage is valid and not expired.
   *
   * @returns true if the token is valid.
   */
  isTokenValid(): boolean {
    const decoded = this.decodedToken;

    if (!decoded) return false;

    // Multiply by 1000 because Date.now() is in milliseconds
    const expiresAt = decoded.exp * 1000;
    const now = Date.now();

    return now < expiresAt;
  }

  /**
   * Retrieves the string currently being stored via `token` key in browser storage. This normally shouldn't be referenced
   * on a typical component page. If the client isn't logged in, the token will be `null`.
   */
  get rawToken(): string | null {
    return this.storage?.getItem('token') ?? null;
  }

  private get decodedToken(): JwtPayload | null {
    const token = this.storage?.getItem('token');

    if (!token) return null;

    try {
      return jwtDecode<JwtPayload>(token);
    } catch {
      return null; // Token is malformed or tampered with
    }
  }

  /**
   * Generates a random UUID and stores it in local storage under `guestId`.
   */
  initGuestId() {
    const guestId = uuidv4();

    this.storage?.setItem('guestId', guestId);
  }

  /**
   * Removes the guest ID from storage.
   */
  clearGuestId() {
    this.storage?.removeItem('guestId');
  }
}
