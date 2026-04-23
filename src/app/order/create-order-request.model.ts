export interface CreateOrderRequest {
  buyerId: string | null;
  guestSessionId: string | null;
  guestEmail: string | null;
  totalPaid: number;
  shippingFirstname: string;
  shippingLastname: string;
  shippingAddress1: string;
  shippingAddress2: string | null;
  shippingCity: string;
  shippingState: string;
  shippingZip: string;
  shippingPhone: string;
}
