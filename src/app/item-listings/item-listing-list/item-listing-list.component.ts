import { Component, Input } from '@angular/core';
import { ItemListing } from '../item-listing.model';
import { ItemListingComponent } from '../item-listing/item-listing.component';

@Component({
  selector: 'app-item-listing-list',
  imports: [ItemListingComponent],
  templateUrl: './item-listing-list.component.html',
  styleUrl: './item-listing-list.component.scss',
})
export class ItemListingListComponent {
  @Input({ required: true }) listings!: ItemListing[];
  @Input() showUsernames = true;
}
