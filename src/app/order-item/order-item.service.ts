import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderItem } from './order-item.model';
import { OrderItemStatus } from './order-item-status.enum';

@Injectable({
  providedIn: 'root',
})
export class OrderItemService {
  private readonly baseUrl = 'http://localhost:8080/api/order-items';

  private http = inject(HttpClient);

  /**
   * Updates the status of an order item.
   *
   * @param orderItemId The UUID of the order item to update.
   * @param newStatus What to set the status field to.
   * @returns The updated order item.
   */
  updateStatus(orderItemId: string, newStatus: OrderItemStatus): Observable<OrderItem> {
    return this.http.patch<OrderItem>(`${this.baseUrl}/${orderItemId}`, { status: newStatus });
  }
}
