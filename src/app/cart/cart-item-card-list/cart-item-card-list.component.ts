import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CartItem } from '../cart-item.model';
import { MatList, MatListItem, MatDivider } from '@angular/material/list';
import { CartItemCardComponent } from '../cart-item-card/cart-item-card.component';
import { ItemListing } from '../../item-listings/item-listing.model';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-cart-item-card-list',
  imports: [MatList, MatListItem, CartItemCardComponent, MatDivider, MatProgressSpinner],
  templateUrl: './cart-item-card-list.component.html',
  styleUrl: './cart-item-card-list.component.scss',
})
export class CartItemCardListComponent {
  @Input({ required: true }) cartItems!: CartItem[] | null;
  @Input() showDelete = true;

  @Output() removeItem = new EventEmitter<ItemListing>();

  remove(item: ItemListing) {
    this.removeItem.emit(item);
  }
}
