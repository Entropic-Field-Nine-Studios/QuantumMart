import { HttpClient } from '@angular/common/http';
import { Component, inject, Injectable, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
@Injectable({ providedIn: 'root' })
export class App {
  private http = inject(HttpClient);
  
  protected readonly title = signal('QuantumMart');
}
