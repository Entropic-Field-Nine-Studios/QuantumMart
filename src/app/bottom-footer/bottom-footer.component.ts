import { Component, inject, signal } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-bottom-footer',
  templateUrl: './bottom-footer.component.html',
  styleUrl: './bottom-footer.component.scss',
})
export class BottomFooterComponent {
  private readonly router = inject(Router);

  readonly showFooter = signal(true);

  constructor() {
    this.router.events.pipe(filter((e) => e instanceof NavigationEnd)).subscribe(() => {
      this.showFooter.set(!this.routeHasFlag('hideFooter'));
    });
  }

  private routeHasFlag(flag: string): boolean {
    let route = this.router.routerState.snapshot.root;

    while (route.firstChild) {
      route = route.firstChild;
    }

    return route.data?.[flag] === true;
  }
}
