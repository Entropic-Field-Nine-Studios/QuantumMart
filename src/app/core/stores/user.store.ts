import { computed, inject, Injectable, signal } from '@angular/core';
import { User } from '../../users/user.model';
import { UserService } from '../../users/user.service';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class UserStore {
  private readonly _user = signal<User | null>(null);
  readonly user = computed(() => this._user());
  private userService = inject(UserService);
  loadUser(username: string) {
    this.userService.getUserByUsername(username).subscribe({
      next: (data) => this._user.set(data),
      error: (err: HttpErrorResponse) => alert(err.message),
    });
  }
  clear() {
    this._user.set(null);
  }
}
