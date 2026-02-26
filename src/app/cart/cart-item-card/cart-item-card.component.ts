import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CartItem } from '../cart-item.model';
import {
  MatCard,
  MatCardHeader,
  MatCardTitle,
  MatCardSubtitle,
  MatCardContent,
  MatCardActions,
} from '@angular/material/card';
import { CurrencyPipe } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { ItemListing } from '../../item-listings/item-listing.model';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-cart-item-card',
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardSubtitle,
    MatCardContent,
    CurrencyPipe,
    MatCardActions,
    MatIcon,
    MatButtonModule,
  ],
  templateUrl: './cart-item-card.component.html',
  styleUrl: './cart-item-card.component.scss',
})
export class CartItemCardComponent {
  @Input({ required: true }) cartItem!: CartItem;
  @Input() showDelete = true;

  @Output() removeItem = new EventEmitter<ItemListing>();

  onRemove() {
    this.removeItem.emit(this.cartItem.itemListing);
  }
}
