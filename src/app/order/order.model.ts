import { OrderItem } from '../order-item/order-item.model';
import { OrderStatus } from './order-status.enum';

export interface Order {
  id?: string;
  buyerId: string;
  status: OrderStatus;
  totalPaid: number;
  shippingFirstname: string;
  shippingLastname: string;
  shippingAddress1: string;
  shippingAddress2?: string | null;
  shippingCity: string;
  shippingState: string;
  shippingZip: string;
  shippingPhone: string;
  createdAt?: string;
  orderItems?: OrderItem[];
}
