export enum OrderItemStatus {
  PAID_PENDING_SHIPMENT = 'PAID_PENDING_SHIPMENT',
  SHIPPED = 'SHIPPED',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
  REFUNDED = 'REFUNDED',
}

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
