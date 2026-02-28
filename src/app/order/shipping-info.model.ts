export interface ShippingInfo {
  firstName: string;
  lastName: string;
  address1: string;
  address2?: string | null;
  city: string;
  state: string;
  zip: string;
  phone: string;
}
