import { Component } from '@angular/core';
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
}
