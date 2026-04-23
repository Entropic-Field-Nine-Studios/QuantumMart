import { OrderItem } from '../order-item/order-item.model';
import { OrderStatus } from './order-status.enum';

export interface Order {
  id: string;
  buyerId: string | null;
  guestEmail: string | null;
  status: OrderStatus;
  totalPaid: number;
  createdAt: string;
  shippingFirstname: string;
  shippingLastname: string;
  shippingAddress1: string;
  shippingAddress2: string | null;
  shippingCity: string;
  shippingState: string;
  shippingZip: string;
  shippingPhone: string;
  orderItems: OrderItem[];
}
