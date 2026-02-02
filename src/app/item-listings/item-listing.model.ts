export interface ItemListing {
  sellerId: string;
  title: string;
  description: string | null;
  price: number;
  imageUrl: string | null;
  createdAt?: string;
  updatedAt?: string;
  id?: string;
}
