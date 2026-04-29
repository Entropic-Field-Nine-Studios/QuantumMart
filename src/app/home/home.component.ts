import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { ItemListingService } from '../item-listings/item-listing.service';
import { ItemListing } from '../item-listings/item-listing.model';
import { MatGridListModule } from '@angular/material/grid-list';
import { AuthService } from '../auth/auth.service';
import { MatFabButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UserStore } from '../core/stores/user.store';
import { User } from '../users/user.model';
import { Paginator } from '../shared/utils/paginator';
import { MatPaginator } from '@angular/material/paginator';
import { finalize } from 'rxjs';
import { ItemListingListComponent } from '../item-listings/item-listing-list/item-listing-list.component';
import { CategoryListComponent } from '../categories/category-list/category-list.component';
import { Category } from '../categories/category.model';
import { CategoryService } from '../categories/category.service';

@Component({
  selector: 'app-home',
  imports: [
    MatGridListModule,
    MatFabButton,
    MatIconModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    MatSlideToggleModule,
    FormsModule,
    MatPaginator,
    ItemListingListComponent,
    CategoryListComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  readonly displayedListings = signal<ItemListing[] | null>(null);
  readonly paginatorListings = new Paginator<ItemListing>();

  readonly loadingListings = signal(true);

  showUserListings = true;

  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);
  private readonly userStore = inject(UserStore);
  private readonly itemListingService = inject(ItemListingService);
  private readonly categoryService = inject(CategoryService);
  private readonly route = inject(ActivatedRoute);

  private readonly allListings = signal<ItemListing[] | null>(null);
  private readonly unownedListings = computed(
    () => this.allListings()?.filter((item) => item.sellerId !== this.user?.id) ?? null,
  );

  private readonly _categories = signal<Category[]>([]);

  ngOnInit(): void {
    this.paginatorListings.pageSize = 20;

    this.loadCategories();
    this.loadListings();

    this.listenForCategoryParams();
  }

  openAddListingDialog(): void {
    this.router.navigate(['/create-listing']);
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

  private loadCategories() {
    this.categoryService
      .getActiveCategories()
      .subscribe((categories) => this._categories.set(categories));
  }

  private loadListings() {
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

  /**
   * Loads listings based on the category parameter in the route URL. If the category is
   * null or invalid, fallback to loading all listings.
   *
   * @param slug
   */
  private loadListingsByCategory(slug: string) {
    this.itemListingService
      .getListingsByCategorySlug(slug)
      .pipe(finalize(() => this.loadingListings.set(false)))
      .subscribe({
        next: (data) => {
          this.allListings.set(data);
          this.showUserListingsToggled();
        },
        error: () => this.loadListings(),
      });
  }

  /**
   * Initializes a subscriber on the route query params for a 'category' field.
   */
  private listenForCategoryParams() {
    this.route.queryParamMap.subscribe((params) => {
      const category = params.get('category');

      if (category) {
        this.loadListingsByCategory(category);
      } else {
        this.loadListings();
      }
    });
  }

  get categories(): Category[] {
    return this._categories();
  }

  get loggedIn(): boolean {
    return this.authService.isLoggedIn;
  }

  private get user(): User | null {
    return this.userStore.user();
  }
}
