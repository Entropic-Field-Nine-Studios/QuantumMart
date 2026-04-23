import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Order } from './order.model';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { CreateOrderRequest } from './create-order-request.model';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  readonly baseUrl = `${environment.apiUrl}/orders`;

  private readonly http = inject(HttpClient);

  /**
   * Retrieves a list of every order purhcased by a user via user ID.
   *
   * ### Error codes
   * - 404 (Not Found) - If the user does not exist.
   *
   * @param userId  ID of the buyer.
   * @returns List of orders.
   */
  getOrdersByUserId(userId: string): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.baseUrl}/user/${userId}`);
  }

  /**
   * Retrieves all orders where at least one item was bought from the specified seller. The retrieved order items will only be
   * from the seller.
   *
   * @param sellerId The seller's user ID.
   * @param unfinished If the orders should be grouped for in-progress orders
   * @returns A list of orders showing purchased items sold by the seller.
   */
  getOrdersRelevantToSeller(sellerId: string, unfinished: boolean): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.baseUrl}/seller/${sellerId}`, {
      params: { unfinished },
    });
  }

  /**
   * Sends a request to create a new order in the database. If successful, the buyer's cart will be cleared.
   *
   * ### Error codes
   * - 400 (Bad Request) - If the buyer's cart is empty.
   * - 403 (Forbidden) - If the buyer placing the order cannot afford the total cost.
   *
   * @param order Information for the order.
   * @returns The order and its order items.
   */
  createOrder(orderInfo: CreateOrderRequest): Observable<Order> {
    return this.http.post<Order>(`${this.baseUrl}`, orderInfo);
  }
}
