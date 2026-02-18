import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { MatTabsModule, MatTabNav } from '@angular/material/tabs';
import { Router, RouterOutlet, RouterLinkWithHref } from '@angular/router';
import { AuthService } from './auth/auth.service';
import {
  MatCard,
  MatCardTitle,
  MatCardHeader,
  MatCardAvatar,
  MatCardSubtitle,
} from '@angular/material/card';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    RouterLinkWithHref,
    MatTabsModule,
    MatTabNav,
    MatCard,
    MatCardTitle,
    MatCardHeader,
    MatCardAvatar,
    MatCardSubtitle,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class AppComponent {
  private http = inject(HttpClient);

  protected readonly title = signal('QuantumMart');

  private readonly hiddenRoutes = ['/login', '/register'];

  constructor(
    private router: Router,
    private authService: AuthService,
  ) {}

  get username(): string | null {
    return this.authService.username;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  profile(): void {
    this.router.navigate(['/profile/'+this.authService.username]);
  }

  showNavBar(): boolean {
    return !this.hiddenRoutes.includes(this.router.url);
  }
}
