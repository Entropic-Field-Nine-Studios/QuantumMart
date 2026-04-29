import { Component } from '@angular/core';
import { RouterOutlet, RouterLinkActive } from '@angular/router';
import { RouterLinkWithHref } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  imports: [RouterOutlet, RouterLinkWithHref, RouterLinkActive],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss',
})
export class AdminDashboardComponent {}
