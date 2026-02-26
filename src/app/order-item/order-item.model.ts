import { OrderItemStatus } from './order-item-status.enum';

export interface OrderItem {
  orderItemId?: string;
  orderId?: string;
  listingId: string;
  sellerId: string;
  quantity: number;
  priceEach: number;
  status?: OrderItemStatus;
  paidAt?: string;
}
