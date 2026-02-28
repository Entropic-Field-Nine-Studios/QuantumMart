import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderItem } from './order-item.model';
import { OrderItemStatus } from './order-item-status.enum';
import { OrderItemWithShippingInfo } from './order-item-with-shipping.model';

@Injectable({
  providedIn: 'root',
})
export class OrderItemService {
  private readonly baseUrl = 'http://localhost:8080/api/order-items';

  private http = inject(HttpClient);

  /**
   * Retrieves a list of order items sold by a specified user. All order items are part of an order.
   *
   * @param sellerId User ID of the seller.
   * @param status (Optional) Get order items only of a certain status
   * @returns List of order items sold by the user.
   */
  getOrderItemsSoldBy(
    sellerId: string,
    status?: OrderItemStatus,
  ): Observable<OrderItemWithShippingInfo[]> {
    const params = new HttpParams();

    if (status) {
      params.set('status', status);
    }

    return this.http.get<OrderItemWithShippingInfo[]>(`${this.baseUrl}/sellerId/${sellerId}`, {
      params: params,
    });
  }

  /**
   * Retrieves every order item in an order.
   *
   * @param orderId UUID of the order.
   * @returns List of order items in the order.
   */
  getOrderItems(orderId: string): Observable<OrderItem[]> {
    return this.http.get<OrderItem[]>(`${this.baseUrl}/orderId/${orderId}`);
  }
}
