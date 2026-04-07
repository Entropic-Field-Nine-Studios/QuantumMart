import { Component, inject } from '@angular/core';
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
import { ItemListing } from '../item-listings/item-listing.model';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { TitleDirective } from '../shared/directives/title.directive';
import { DescriptionDirective } from '../shared/directives/description.directive';
import { MessageService } from '../shared/message/message.service';

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
  ],
  templateUrl: './create-item-listing.component.html',
  styleUrl: './create-item-listing.component.scss',
})
export class CreateItemListingComponent {
  readonly createListingForm = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl(''),
    imageUrl: new FormControl(''),
    price: new FormControl(''),
  });

  private itemListingService = inject(ItemListingService);
  private authService = inject(AuthService);
  private router = inject(Router);
  private messageService = inject(MessageService);

  private canLeave = false;

  public canDeactivate(): boolean {
    return !this.createListingForm.dirty || this.canLeave;
  }

  createListing() {
    if (this.createListingForm.valid && this.authService.isLoggedIn) {
      const values = this.createListingForm.value!;
      const price = Number(values.price!.replace(',', ''));

      const listing: ItemListing = {
        sellerId: this.authService.userId!,
        title: values.title!,
        description: values.description ?? null,
        imageUrl: values.imageUrl ?? null,
        price: price,
        sellerUsername: this.authService.username!,
        isActive: true,
      };

      this.itemListingService.createListing(listing).subscribe({
        next: () => {
          this.messageService.success('Your listing was created.');
          this.canLeave = true;
          this.router.navigate(['/home']);
        },
        error: (err: HttpErrorResponse) => this.messageService.error(err.message),
      });
    }
  }
}
