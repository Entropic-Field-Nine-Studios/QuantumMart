import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TopHeaderComponent } from './top-header/top-header.component';
import { BotFooterComponent } from './bot-footer/bot-footer.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TopHeaderComponent, BotFooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  protected readonly title = signal('QuantumMart');
}
