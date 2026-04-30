import { Component, inject, OnInit, signal } from '@angular/core';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { TitleDirective } from '../../shared/directives/title.directive';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PriceInputComponent } from '../../shared/inputs/price-input/price-input.component';
import { DescriptionDirective } from '../../shared/directives/description.directive';
import { MatAnchor } from '@angular/material/button';
import { ItemListingService } from '../item-listing.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { ItemListing } from '../item-listing.model';
import { HttpErrorResponse } from '@angular/common/http';
import { MessageService } from '../../shared/message/message.service';
import { UpdateItemListing } from '../update-listing.model';
import { ConfirmDialogService } from '../../shared/dialogs/confirm-dialog.service';
import { Title } from '@angular/platform-browser';
import { qmTitle } from '../../title/qm-title';
import { ImageInputComponent } from 'src/app/shared/inputs/image-input/image-input.component';
import { CategoryService } from 'src/app/categories/category.service';
import { Category } from 'src/app/categories/category.model';
import { MatSelect, MatOption } from '@angular/material/select';

@Component({
  selector: 'app-edit-item-listing',
  imports: [
    MatFormField,
    MatLabel,
    MatInput,
    TitleDirective,
    PriceInputComponent,
    ReactiveFormsModule,
    DescriptionDirective,
    MatAnchor,
    ImageInputComponent,
    MatSelect,
    MatOption,
  ],
  templateUrl: './edit-item-listing.component.html',
  styleUrl: './edit-item-listing.component.scss',
})
export class EditItemListingComponent implements OnInit {
  readonly editListingForm = new FormGroup({
    categorySlug: new FormControl<string>('', Validators.required),
    title: new FormControl('', Validators.required),
    description: new FormControl<string | null>(null),
    imageUrl: new FormControl<string | null>(null),
    price: new FormControl(''),
  });

  readonly listing = signal<ItemListing | null>(null);

  private readonly itemListingService = inject(ItemListingService);
  private readonly activeRoute = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly auth = inject(AuthService);
  private readonly messageService = inject(MessageService);
  private readonly confirmDialog = inject(ConfirmDialogService);
  private readonly categoryService = inject(CategoryService);
  private readonly title = inject(Title);

  private readonly _categories = signal<Category[]>([]);

  ngOnInit(): void {
    const listingId = this.activeRoute.snapshot.paramMap.get('listid');

    if (!listingId) {
      this.router.navigate(['/404']);
      return;
    }

    this.loadListing(listingId);
    this.loadCategories();
  }

  get categories(): Category[] {
    return this._categories();
  }

  get currentImageUrl(): string | null {
    return this.listing()?.imageUrl ?? null;
  }

  adjustImageUrl(url: string) {
    this.editListingForm.patchValue({ imageUrl: url });
  }

  saveClicked() {
    if (this.auth.isLoggedIn && this.editListingForm.valid) {
      const listing = this.listing()!;
      const updates = this.getUpdates();

      this.itemListingService.updateListing(listing.id!, updates).subscribe({
        next: () => {
          this.messageService.success('Listing updated.');
          this.navigateBack(false);
        },
        error: (err: HttpErrorResponse) => this.messageService.error(err.message),
      });
    }
  }

  navigateBack(confirm = true) {
    if (confirm && this.editListingForm.dirty) {
      this.confirmDialog.confirm('You have unsaved changes. Leave?').subscribe((confirmed) => {
        if (confirmed) {
          this.router.navigate(['..'], { relativeTo: this.activeRoute });
        }
      });
    } else {
      this.router.navigate(['..'], { relativeTo: this.activeRoute });
    }
  }

  private loadCategories() {
    this.categoryService
      .getActiveCategories()
      .subscribe((categories) => this._categories.set(categories));
  }

  private loadListing(listingId: string) {
    this.itemListingService.getListingById(listingId).subscribe({
      next: (listing) => {
        this.listing.set(listing);
        this.title.setTitle(qmTitle('Editing ' + listing.title));
        this.autoFillForm(listing);
      },
      error: () => this.router.navigate(['/404']),
    });
  }

  private autoFillForm(listing: ItemListing) {
    this.editListingForm.patchValue({
      categorySlug: listing.categorySlug,
      title: listing.title,
      description: listing.description,
      imageUrl: listing.imageUrl,
      price: listing.price.toString(),
    });
  }

  private getUpdates(): UpdateItemListing {
    const ogListing = this.listing()!;
    const fields = this.editListingForm.value;
    const updates: UpdateItemListing = {};

    if (ogListing.title !== fields.title) {
      updates.title = fields.title!;
    }

    if (ogListing.description !== fields.description) {
      updates.description = fields.description!;
    }

    if (ogListing.imageUrl !== fields.imageUrl) {
      updates.imageUrl = fields.imageUrl!;
    }

    if (ogListing.price.toString() !== fields.price) {
      updates.price = Number.parseFloat(fields.price!);
    }

    if (ogListing.categorySlug !== fields.categorySlug) {
      updates.categorySlug = fields.categorySlug!;
    }

    return updates;
  }
}
