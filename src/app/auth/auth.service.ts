import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginResponse } from './login-response.model';
import { jwtDecode } from 'jwt-decode';
import { JwtPayload } from './jwt-payload.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly baseUrl = 'http://localhost:8080/api/auth';

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  login(username: string, rawPassword: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.baseUrl}/login`, { username, rawPassword });
  }

  /**
   * Removes token and username information from browser storage, then navigates
   * to the login page.
   *
   * @param navigateLogin If the application should route the user to the login page.
   */
  logout(navigateLogin: boolean = true): void {
    this.storage?.removeItem('token');

    if (navigateLogin) {
      this.router.navigate(['/login']);
    }
  }

  private get storage() {
    return typeof window !== 'undefined' ? window.localStorage : null;
  }

  get username(): string | null {
    return this.decodedToken?.sub ?? null;
  }

  get isLoggedIn(): boolean {
    return this.isTokenValid();
  }

  get userId(): string | null {
    return this.decodedToken?.uid ?? null;
  }

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

  get rawToken(): string | null {
    return this.storage?.getItem('token') ?? null;
  }

  private get decodedToken(): JwtPayload | null {
    const token = this.storage?.getItem('token');

    if (!token) return null;

    try {
      return jwtDecode<JwtPayload>(token);
    } catch (e) {
      return null; // Token is malformed or tampered with
    }
  }
}
