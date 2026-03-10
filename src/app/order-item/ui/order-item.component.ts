import { Component, inject, Input, signal } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { OrderItem } from '../order-item.model';
import { OrderItemStatus } from '../order-item-status.enum';
import { MatRadioModule } from '@angular/material/radio';
import { ConfirmDialogService } from '../../shared/dialogs/confirm-dialog.service';
import { OrderItemService } from '../order-item.service';
import {
  FormControl,
  Validators,
  ɵInternalFormsSharedModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatAnchor } from '@angular/material/button';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-order-item',
  imports: [
    MatExpansionModule,
    CurrencyPipe,
    MatRadioModule,
    MatAnchor,
    ɵInternalFormsSharedModule,
    ReactiveFormsModule,
    DatePipe,
  ],
  templateUrl: './order-item.component.html',
  styleUrl: './order-item.component.scss',
  standalone: true,
})
export class OrderItemComponent {
  @Input({ required: true }) itemInfo!: OrderItem;
  @Input() isAlt = false;
  @Input() forSeller = false;

  OrderItemStatus = OrderItemStatus;

  selectedStatus = new FormControl(null, Validators.required);
  sentUpdate = signal(false);

  private confirmService = inject(ConfirmDialogService);
  private orderItemService = inject(OrderItemService);

  get itemStatus(): string {
    const status = this.itemInfo.status!;

    switch (status) {
      case OrderItemStatus.PAID_PENDING_SHIPMENT:
        return 'Awaiting Shipment';
      case OrderItemStatus.SHIPPED:
        return 'Shipped';
      case OrderItemStatus.COMPLETED:
        return 'Completed';
      case OrderItemStatus.CANCELED:
        return 'Canceled';
      case OrderItemStatus.REFUNDED:
        return 'Refunded';
      default:
        return 'UNKNOWN';
    }
  }

  normalizeStatus(): string {
    return this.itemStatus.toLowerCase().replace(/\s+/g, '-');
  }

  sendUpdate() {
    if (this.forSeller && this.selectedStatus.value !== null) {
      this.confirmService
        .confirm(
          `Are you sure you want to update the status to ${this.selectedStatus.value}? This cannot be undone.`,
        )
        .subscribe((confirm) => {
          if (confirm) {
            this.orderItemService
              .updateStatus(this.itemInfo.id!, this.selectedStatus.value!)
              .subscribe({
                next: (updatedItem) => {
                  alert('Item has been updated.');
                  this.itemInfo.status = updatedItem.status;
                  this.sentUpdate.set(true);
                },
                error: (err: HttpErrorResponse) => alert(err.message),
              });
          }
        });
    }
  }
}
