import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { NotFoundComponent } from '../not-found/not-found.component';

@Component({
  selector: 'app-bottom-footer',
  templateUrl: './bottom-footer.component.html',
  styleUrl: './bottom-footer.component.scss',
})
export class BottomFooterComponent {
  private readonly router = inject(Router);

  isAt404(): boolean {
    return this.router.routerState.snapshot.root.firstChild?.component === NotFoundComponent;
  }
}
