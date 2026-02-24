import { OrderItem } from '../orderitem/order-item.model';
import { Order } from './order.model';

export interface OrderWithItems {
  order: Order;
  orderItems: OrderItem[];
}
