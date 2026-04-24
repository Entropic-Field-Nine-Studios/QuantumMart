export interface AddressForm {
  guestEmail: string | null;
  firstName: string;
  lastName: string;
  addressLine1: string;
  addressLine2?: string | null;
  city: string;
  state: string;
  zip: string;
  phone: string;
  makePrimary: boolean;
  shouldSave: boolean;
}
