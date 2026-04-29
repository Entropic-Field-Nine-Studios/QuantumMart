import { Component, inject, OnInit, signal } from '@angular/core';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatAnchor } from '@angular/material/button';
import { PriceInputComponent } from '../shared/inputs/price-input/price-input.component';
import {
  FormControl,
  FormGroup,
  Validators,
  ɵInternalFormsSharedModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { ItemListingService } from '../item-listings/item-listing.service';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { TitleDirective } from '../shared/directives/title.directive';
import { DescriptionDirective } from '../shared/directives/description.directive';
import { MessageService } from '../shared/message/message.service';
import { CreateItemListingRequest } from '../item-listings/create-item-listing-request.model';
import { ImageInputComponent } from '../shared/inputs/image-input/image-input.component';
import { CategoryService } from '../categories/category.service';
import { Category } from '../categories/category.model';
import { MatSelect, MatOption } from '@angular/material/select';

@Component({
  selector: 'app-create-item-listing',
  imports: [
    MatFormField,
    MatLabel,
    MatInput,
    MatAnchor,
    PriceInputComponent,
    ɵInternalFormsSharedModule,
    ReactiveFormsModule,
    TitleDirective,
    DescriptionDirective,
    ImageInputComponent,
    MatSelect,
    MatOption,
  ],
  templateUrl: './create-item-listing.component.html',
  styleUrl: './create-item-listing.component.scss',
})
export class CreateItemListingComponent implements OnInit {
  readonly createListingForm = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl<string | null>(null),
    imageUrl: new FormControl<string | null>(null),
    price: new FormControl(''),
    categorySlug: new FormControl<string>('', Validators.required),
  });

  private readonly itemListingService = inject(ItemListingService);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly messageService = inject(MessageService);
  private readonly categoryService = inject(CategoryService);

  private readonly _categories = signal<Category[]>([]);

  private canLeave = false;

  ngOnInit(): void {
    this.loadCategories();
  }

  public canDeactivate(): boolean {
    return !this.createListingForm.dirty || this.canLeave;
  }

  createListing() {
    if (this.createListingForm.valid && this.authService.isLoggedIn) {
      const values = this.createListingForm.value!;
      const price = Number(values.price!.replace(',', ''));

      const req: CreateItemListingRequest = {
        title: values.title!,
        description: values.description ?? null,
        imageUrl: values.imageUrl ?? null,
        price: price,
        categorySlug: values.categorySlug!,
      };

      this.itemListingService.createListing(req).subscribe({
        next: () => {
          this.messageService.success('Your listing was created.');
          this.canLeave = true;
          this.router.navigate(['/home']);
        },
        error: (err: HttpErrorResponse) => this.messageService.error(err.message),
      });
    }
  }

  adjustImageUrl(url: string) {
    this.createListingForm.patchValue({ imageUrl: url });
  }

  get categories(): Category[] {
    return this._categories();
  }

  private loadCategories() {
    this.categoryService
      .getActiveCategories()
      .subscribe((categories) => this._categories.set(categories));
  }
}
