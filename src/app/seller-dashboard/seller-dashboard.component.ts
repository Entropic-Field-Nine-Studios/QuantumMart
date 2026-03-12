import { Component, inject, OnInit, signal } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { MatAccordion } from '@angular/material/expansion';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { OrderService } from '../order/order.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Order } from '../order/order.model';
import { OrderComponent } from '../order/ui/order.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MessageService } from '../shared/message/message.service';
import { Paginator } from '../shared/utils/paginator';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-seller-dashboard',
  imports: [MatAccordion, MatProgressSpinner, OrderComponent, MatPaginatorModule],
  templateUrl: './seller-dashboard.component.html',
  styleUrl: './seller-dashboard.component.scss',
})
export class SellerDashboardComponent implements OnInit {
  private orderService = inject(OrderService);
  private authService = inject(AuthService);
  private messageService = inject(MessageService);

  readonly paginatorInProgress = new Paginator<Order>();
  readonly paginatorCompleted = new Paginator<Order>();

  readonly loadingInProgress = signal(true);
  readonly loadingCompleted = signal(true);

  ngOnInit(): void {
    this.loadItems();
  }

  private loadItems() {
    this.loadingCompleted.set(true);
    this.loadingInProgress.set(true);

    this.orderService
      .getOrdersRelevantToSeller(this.authService.userId!, true)
      .pipe(finalize(() => this.loadingInProgress.set(false)))
      .subscribe({
        next: (sellerOrders) => {
          this.paginatorInProgress.setItems(sellerOrders);
        },
        error: (err: HttpErrorResponse) => this.messageService.error(err.message),
      });

    this.orderService
      .getOrdersRelevantToSeller(this.authService.userId!, false)
      .pipe(finalize(() => this.loadingCompleted.set(false)))
      .subscribe({
        next: (sellerOrders) => {
          this.paginatorCompleted.setItems(sellerOrders);
        },
        error: (err: HttpErrorResponse) => this.messageService.error(err.message),
      });
  }
}
