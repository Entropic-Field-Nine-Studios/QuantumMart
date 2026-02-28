import { ShippingInfo } from '../order/shipping-info.model';
import { OrderItem } from './order-item.model';

export interface OrderItemWithShippingInfo {
  orderItem: OrderItem;
  shippingInfo: ShippingInfo;
}
