import { Component, inject, OnInit, signal } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { MatAccordion } from '@angular/material/expansion';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { OrderService } from '../order/order.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Order } from '../order/order.model';
import { OrderComponent } from '../order/ui/order.component';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-seller-dashboard',
  imports: [MatAccordion, MatProgressSpinner, OrderComponent, MatPaginatorModule],
  templateUrl: './seller-dashboard.component.html',
  styleUrl: './seller-dashboard.component.scss',
})
export class SellerDashboardComponent implements OnInit {
  private orderService = inject(OrderService);
  private authService = inject(AuthService);

  readonly inProgressOrders = signal<Order[] | null>(null);
  readonly pagedInProgressOrders = signal<Order[]>([]);
  pageIndexInProgress = 0;
  pageSizeInProgress = 5;

  readonly completedOrders = signal<Order[] | null>(null);
  readonly pagedCompletedOrders = signal<Order[]>([]);
  pageIndexCompleted = 0;
  pageSizeCompleted = 5;

  ngOnInit(): void {
    this.loadItems();
  }

  updateInProgressOrders() {
    const start = this.pageIndexInProgress * this.pageSizeInProgress;
    const end = start + this.pageSizeInProgress;
    this.pagedInProgressOrders.set(this.inProgressOrders()!.slice(start, end));
  }

  updateCompletedOrders() {
    const start = this.pageIndexCompleted * this.pageSizeCompleted;
    const end = start + this.pageSizeCompleted;
    this.pagedCompletedOrders.set(this.completedOrders()!.slice(start, end));
  }

  onInProgressPageCompleted(event: PageEvent) {
    this.pageIndexCompleted = event.pageIndex;
    this.pageSizeCompleted = event.pageSize;
    this.updateInProgressOrders();
  }

  onCompletedPageCompleted(event: PageEvent) {
    this.pageIndexCompleted = event.pageIndex;
    this.pageSizeCompleted = event.pageSize;
    this.updateCompletedOrders();
  }

  private loadItems() {
    this.orderService.getOrdersRelevantToSeller(this.authService.userId!, true).subscribe({
      next: (sellerOrders) => {
        this.inProgressOrders.set(sellerOrders);
        this.updateInProgressOrders();
      },
      error: (err: HttpErrorResponse) => alert(err.message),
    });

    this.orderService.getOrdersRelevantToSeller(this.authService.userId!, false).subscribe({
      next: (sellerOrders) => {
        this.completedOrders.set(sellerOrders);
        this.updateCompletedOrders();
      },
      error: (err: HttpErrorResponse) => alert(err.message),
    });
  }
}
