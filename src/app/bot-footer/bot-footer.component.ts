import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { NotFoundComponent } from '../not-found/not-found.component';

@Component({
  selector: 'app-bot-footer',
  templateUrl: './bot-footer.component.html',
  styleUrl: './bot-footer.component.scss',
})
export class BotFooterComponent {
  private readonly router = inject(Router);

  isAt404(): boolean {
    return this.router.routerState.snapshot.root.firstChild?.component === NotFoundComponent;
  }
}
