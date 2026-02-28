import { OrderItemStatus } from './order-item-status.enum';

export interface OrderItem {
  orderItemId?: string;
  orderId?: string;
  listingId: string;
  sellerId: string;
  quantity: number;
  listingPrice: number;
  status?: OrderItemStatus;
  paidAt?: string;
  listingTitle: string;
  listingDescription?: string | null;
  listingImageUrl?: string | null;
}
