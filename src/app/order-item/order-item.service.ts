import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderItem } from './order-item.model';

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
   * @returns List of order items sold by the user.
   */
  getOrderItemsSoldBy(sellerId: string): Observable<OrderItem[]> {
    return this.http.get<OrderItem[]>(`${this.baseUrl}/sellerId/${sellerId}`);
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
