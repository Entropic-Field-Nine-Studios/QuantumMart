import { Component, inject, OnInit, signal } from '@angular/core';
import { OrderItemService } from '../order-item/order-item.service';
import { AuthService } from '../auth/auth.service';
import { OrderItemStatus } from '../order-item/order-item-status.enum';
import { MatAccordion } from '@angular/material/expansion';
import { OrderItemWithShippingInfo } from '../order-item/order-item-with-shipping.model';
import { OrderItemComponent } from '../order-item/order-item.component';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-seller-dashboard',
  imports: [MatAccordion, OrderItemComponent, MatProgressSpinner],
  templateUrl: './seller-dashboard.component.html',
  styleUrl: './seller-dashboard.component.scss',
})
export class SellerDashboardComponent implements OnInit {
  private orderItemService = inject(OrderItemService);
  private authService = inject(AuthService);

  readonly pendingOrderItems = signal<OrderItemWithShippingInfo[] | null>(null);
  readonly otherOrderItems = signal<OrderItemWithShippingInfo[] | null>(null);

  ngOnInit(): void {
    this.loadItems();
  }

  private loadItems() {
    this.orderItemService
      .getOrderItemsSoldBy(this.authService.userId!, OrderItemStatus.PAID_PENDING_SHIPMENT)
      .subscribe({
        next: (items) => this.pendingOrderItems.set(items),
      });

    this.orderItemService.getOrderItemsSoldBy(this.authService.userId!).subscribe({
      next: (items) => {
        const filtered = items.filter(
          (orderItemInfo) =>
            orderItemInfo.orderItem.status !== OrderItemStatus.PAID_PENDING_SHIPMENT,
        );

        this.otherOrderItems.set(filtered);
      },
    });
  }
}
