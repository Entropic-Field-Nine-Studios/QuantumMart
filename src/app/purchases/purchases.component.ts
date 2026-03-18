import { Component, inject, OnInit } from '@angular/core';
import { OrderService } from '../order/order.service';
import { UserStore } from '../core/stores/user.store';
import { Paginator } from '../shared/utils/paginator';
import { Order } from '../order/order.model';
import { MessageService } from '../shared/message/message.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatAccordion } from '@angular/material/expansion';
import { OrderComponent } from '../order/ui/order.component';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-purchases',
  imports: [MatAccordion, OrderComponent, MatPaginator],
  templateUrl: './purchases.component.html',
  styleUrl: './purchases.component.scss',
})
export class PurchasesComponent implements OnInit {
  readonly paginatorOrders = new Paginator<Order>(10);

  private readonly orderService = inject(OrderService);
  private readonly userStore = inject(UserStore);
  private readonly messageService = inject(MessageService);

  ngOnInit(): void {
    const user = this.userStore.user()!;

    // Load orders
    this.orderService.getOrdersByUserId(user.id).subscribe({
      next: (orders) => this.paginatorOrders.setItems(orders),
      error: (err: HttpErrorResponse) => this.messageService.error(err.message),
    });
  }
}
