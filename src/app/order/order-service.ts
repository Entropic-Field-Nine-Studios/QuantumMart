import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Order } from './order.model';
import { Observable } from 'rxjs';
import { OrderWithItems } from './order-with-items.model';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private readonly baseUrl = 'http://localhost:8080/api/orders';

  private http = inject(HttpClient);

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
    return this.http.get<Order[]>(`${this.baseUrl}/buyerId/${userId}`);
  }

  /**
   * Retrieves a list of every order purchased by a user via username. Ignores casing.
   *
   * ### Error codes
   * - 404 (Not Found) - If the user does not exist.
   *
   * @param username Username of the buyer.
   * @returns Orders bought by the user.
   */
  getOrdersByUsername(username: string): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.baseUrl}/username/${username}`);
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
  createOrder(orderInfo: Order): Observable<OrderWithItems> {
    return this.http.post<OrderWithItems>(`${this.baseUrl}`, orderInfo);
  }
}
