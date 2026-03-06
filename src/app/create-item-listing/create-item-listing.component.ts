import { Component } from '@angular/core';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatAnchor } from '@angular/material/button';

@Component({
  selector: 'app-create-item-listing',
  imports: [MatFormField, MatLabel, MatInput, MatAnchor],
  templateUrl: './create-item-listing.component.html',
  styleUrl: './create-item-listing.component.scss'
})
export class CreateItemListingComponent {}
