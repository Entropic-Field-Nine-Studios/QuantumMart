import { HttpClient } from '@angular/common/http';
import { Component, inject, Injectable, signal } from '@angular/core';
import { MatTabsModule, MatTabNav } from '@angular/material/tabs';
import { Router, RouterOutlet, RouterLinkWithHref } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLinkWithHref, MatTabsModule, MatTabNav],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
@Injectable({ providedIn: 'root' })
export class App {
  private http = inject(HttpClient);
  
  protected readonly title = signal('QuantumMart');
}
