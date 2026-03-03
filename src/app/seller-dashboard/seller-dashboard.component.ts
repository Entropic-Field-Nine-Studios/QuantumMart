import { Component, inject, OnInit, signal } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { MatAccordion } from '@angular/material/expansion';
import { OrderItemWithShippingInfo } from '../order-item/order-item-with-shipping.model';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { OrderService } from '../order/order.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Order } from '../order/order.model';
import { OrderComponent } from '../order/ui/order.component';

@Component({
  selector: 'app-seller-dashboard',
  imports: [MatAccordion, MatProgressSpinner, OrderComponent],
  templateUrl: './seller-dashboard.component.html',
  styleUrl: './seller-dashboard.component.scss',
})
export class SellerDashboardComponent implements OnInit {
  private orderService = inject(OrderService);
  private authService = inject(AuthService);

  readonly pendingOrders = signal<Order[] | null>(null);
  readonly otherOrderItems = signal<OrderItemWithShippingInfo[] | null>(null);

  ngOnInit(): void {
    this.loadItems();
  }

  private loadItems() {
    this.orderService.getOrdersRelevantToSeller(this.authService.userId!).subscribe({
      next: (sellerOrders) => this.pendingOrders.set(sellerOrders),
      error: (err: HttpErrorResponse) => alert(err.message),
    });

    this.otherOrderItems.set([]);
  }
}
