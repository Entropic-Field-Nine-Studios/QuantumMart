import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginResponse } from './login-response.model';
import { jwtDecode } from 'jwt-decode';
import { JwtPayload } from './jwt-payload.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly baseUrl = "http://localhost:8080/api/auth";

  constructor(private http: HttpClient) {}

  login(username: string, rawPassword: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.baseUrl}/login`, { username, rawPassword });
  }

  logout(): void {
    this.storage?.removeItem('token');
    this.storage?.removeItem('username');
  }

  private get storage() {
    return typeof window !== 'undefined' ? window.localStorage : null;
  }

  get username() {
    return this.storage?.getItem('username') ?? null;
  }

  get isLoggedIn() {
    return !!this.storage?.getItem('token');
  }

  get userId(): string | null {
    return this.decodedToken?.uid ?? null;
  }

  get userRole(): string | null {
    return this.decodedToken?.role ?? null;
  }

  private get decodedToken(): JwtPayload | null {
    const token = this.storage?.getItem('token');
    if (!token) return null;

    const decoded: JwtPayload = jwtDecode(token);
    return decoded;
  }
}
