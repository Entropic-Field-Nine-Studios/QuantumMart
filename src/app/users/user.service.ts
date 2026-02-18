import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegisterUserInfo } from './register-user-info.model';
import { User } from './user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly baseUrl = 'http://localhost:8080/api/users';

  constructor(private http: HttpClient) {}

  createUser(registrationInfo: RegisterUserInfo): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}`, registrationInfo);
  }

  getUserById(id: string): Observable<User | null> {
    return this.http.get<User | null>(`${this.baseUrl}/${id}`);
  }

  getUserByUsername(username: string): Observable<User | null> {
    return this.http.get<User | null>(`${this.baseUrl}/username=${username}`);
  }
}
