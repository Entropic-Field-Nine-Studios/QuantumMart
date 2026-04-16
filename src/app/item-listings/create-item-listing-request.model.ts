export interface CreateItemListingRequest {
  title: string;
  description: string | null;
  imageUrl: string | null;
  price: number;
}
