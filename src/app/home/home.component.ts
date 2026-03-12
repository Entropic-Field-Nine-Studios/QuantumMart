import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { ItemListingService } from '../item-listings/item-listing.service';
import { ItemListing } from '../item-listings/item-listing.model';
import { MatGridListModule } from '@angular/material/grid-list';
import { ItemListingComponent } from '../item-listings/item-listing/item-listing.component';
import { AuthService } from '../auth/auth.service';
import { MatFabButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UserStore } from '../core/stores/user.store';
import { User } from '../users/user.model';
import { Paginator } from '../shared/utils/paginator';
import { MatPaginator } from '@angular/material/paginator';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-home',
  imports: [
    ItemListingComponent,
    MatGridListModule,
    MatFabButton,
    MatIconModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    MatSlideToggleModule,
    FormsModule,
    MatPaginator,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  readonly displayedListings = signal<ItemListing[] | null>(null);
  readonly paginatorListings = new Paginator<ItemListing>();

  readonly loadingListings = signal(true);

  showUserListings = true;

  private router = inject(Router);
  private authService = inject(AuthService);
  private userStore = inject(UserStore);
  private itemListingService = inject(ItemListingService);

  private readonly allListings = signal<ItemListing[] | null>(null);
  private readonly unownedListings = computed(
    () => this.allListings()?.filter((item) => item.sellerId !== this.user?.id) ?? null,
  );

  ngOnInit(): void {
    this.itemListingService
      .getAllListings()
      .pipe(finalize(() => this.loadingListings.set(false)))
      .subscribe({
        next: (data) => {
          this.allListings.set(data);
          this.showUserListingsToggled();
        },
        error: () => this.allListings.set([]),
      });
  }

  openAddListingDialog(): void {
    this.router.navigate(['/create-listing']);
  }

  openCartDialog(): void {
    this.router.navigate(['/cart']);
  }

  showUserListingsToggled() {
    if (this.showUserListings) {
      this.paginatorListings.setItems(this.allListings() ?? []);
    } else {
      this.paginatorListings.setItems(this.unownedListings() ?? []);
    }

    this.paginatorListings.pageIndex = 0;
  }

  hasOwnedListings(): boolean {
    return this.allListings()?.length !== this.unownedListings()?.length;
  }

  get loggedIn(): boolean {
    return this.authService.isLoggedIn;
  }

  private get user(): User | null {
    return this.userStore.user();
  }
}
