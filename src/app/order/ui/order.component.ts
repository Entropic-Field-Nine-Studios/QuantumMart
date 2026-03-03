import { Component, Input } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { DatePipe } from '@angular/common';
import { Order } from '../order.model';
import { OrderItemComponent } from '../../order-item/ui/order-item.component';

@Component({
  selector: 'app-order',
  imports: [MatExpansionModule, DatePipe, OrderItemComponent],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss',
  standalone: true,
})
export class OrderComponent {
  @Input({ required: true }) order!: Order;
  @Input() isAlt = false;
  @Input() forSeller = false;

  get fullName(): string {
    return this.order.shippingFirstname + ' ' + this.order.shippingLastname;
  }

  get addressPart1(): string {
    const address2 = this.order.shippingAddress2;

    if (address2) {
      return this.order.shippingAddress1 + ' ' + address2;
    } else {
      return this.order.shippingAddress1;
    }
  }

  get addressPart2(): string {
    return this.order.shippingCity + ', ' + this.order.shippingState + ' ' + this.order.shippingZip;
  }
}
