import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TopHeaderComponent } from './top-header/top-header.component';
import { BottomFooterComponent } from './bottom-footer/bottom-footer.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TopHeaderComponent, BottomFooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  protected readonly title = signal('QuantumMart');
}
