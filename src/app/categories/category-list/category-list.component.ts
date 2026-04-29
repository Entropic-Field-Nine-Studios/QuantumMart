import { Component, inject, Input } from '@angular/core';
import { Category } from '../category.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-category-list',
  imports: [],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.scss',
})
export class CategoryListComponent {
  @Input({ required: true }) categories!: Category[];

  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  private currentSlug: string | null = null;

  applyCategoryParam(slug: string) {
    if (slug !== this.currentSlug) {
      this.currentSlug = slug;

      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { category: slug },
      });
    } else {
      // Clicking on the current category button resets the url parameters
      this.currentSlug = null;

      this.clearParams();
    }
  }

  private clearParams() {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {},
    });
  }
}
