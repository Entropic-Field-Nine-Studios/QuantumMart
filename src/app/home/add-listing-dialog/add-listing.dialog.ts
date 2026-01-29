import { Component, inject } from '@angular/core';
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormControl, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import {
    MatDialogActions, MatDialogContent,
    MatDialogRef,
    MatDialogTitle
} from '@angular/material/dialog';
import { PriceInputDirective } from '../../directives/price-input.directive';
import { ItemListingService } from '../../item-listings/item-listing.service';
import { ItemListing } from '../../item-listings/item-listing.model';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'add-listing-dialog',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    ReactiveFormsModule,
    PriceInputDirective
  ],
  templateUrl: './add-listing.dialog.html',
  styleUrl: './add-listing.dialog.scss'
})
export class AddListingDialogComponent {
  readonly dialogRef = inject(MatDialogRef<AddListingDialogComponent>);

  readonly listingForm = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl(''),
    imageUrl: new FormControl(''),
    price: new FormControl('0.00', [Validators.required, Validators.pattern(RegExp('^[0-9]+(\.[0-9]{1,2})?$'))])
  });

  constructor(
    private itemListingService: ItemListingService,
    private authService: AuthService
  ) {}

  formValid() {
    return this.listingForm.valid;
  }

  createListing() {
    if (this.listingForm.valid && this.authService.isLoggedIn) {
        const formValues = this.listingForm.value!;
        
        this.itemListingService.createListing({
            title: formValues.title!,
            description: formValues.description ?? null,
            sellerId: this.authService.userId!,
            imageUrl: formValues.imageUrl ?? null,
            price: Number(formValues.price!)
        }).subscribe({
            next: _ => {
                alert("Listing created!");
                this.dialogRef.close();
            },
            error: _ => alert("Error: Could not create listing.")
        });
    }   
  }

  closeWithConfirm() {
    const confirmed = confirm('Are you sure you want to cancel?');
    if (confirmed) {
      this.dialogRef.close('confirm-close');
    }
  }
}