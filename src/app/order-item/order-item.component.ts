import { Component, Input } from '@angular/core';
import { OrderItemWithShippingInfo } from './order-item-with-shipping.model';
import { MatExpansionModule } from '@angular/material/expansion';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-order-item',
  imports: [MatExpansionModule, DatePipe],
  templateUrl: './order-item.component.html',
  styleUrl: './order-item.component.scss',
  standalone: true,
})
export class OrderItemComponent {
  @Input({ required: true }) itemInfo!: OrderItemWithShippingInfo;
  @Input() isAlt = false;

  get fullName(): string {
    const shippingInfo = this.itemInfo.shippingInfo;

    return shippingInfo.firstName + ' ' + shippingInfo.lastName;
  }

  get addressPart1(): string {
    const shippingInfo = this.itemInfo.shippingInfo;

    if (shippingInfo.address2 !== null) {
      return shippingInfo.address1 + ' ' + shippingInfo.address2;
    } else {
      return shippingInfo.address1;
    }
  }

  get addressPart2(): string {
    const shippingInfo = this.itemInfo.shippingInfo;

    return shippingInfo.city + ', ' + shippingInfo.state + ' ' + shippingInfo.zip;
  }
}
