export interface Address {
  id?: string;
  userId: string;
  isPrimary: boolean;
  firstName: string;
  lastName: string;
  addressLine1: string;
  addressLine2?: string | null;
  city: string;
  state: string;
  zip: string;
  createdAt?: string;
}
