import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegisterUserInfo } from './register-user-info.model';
import { User } from './user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly baseUrl = 'http://localhost:8080/api/users';

  private http = inject(HttpClient);

  /**
   * Sends a request to save a user to the database.
   *
   * ### Error codes
   * - 409 (Conflict) - If a user already has the requested username (ignores casing).
   *
   * @param registrationInfo Registration information for the user.
   * @returns The newly created user object.
   */
  createUser(registrationInfo: RegisterUserInfo): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}`, registrationInfo);
  }

  /**
   * Retrieves a user entity that matches against an ID.
   *
   * ### Error codes
   * - 404 (Not Found) - If no user has the requested ID.
   *
   * @param id UUID of an existing user.
   * @returns User object matching the ID.
   */
  getUserById(id: string): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/${id}`);
  }

  /**
   * Retrieves a user entity matching against a username. Casing is ignored.
   *
   * ### Error codes
   * - 404 (Not Found) - If no user with this username exists.
   *
   * @param username Username of a user.
   * @returns User entity associated with the requested username.
   */
  getUserByUsername(username: string): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/username=${username}`);
  }
}
