import { ItemListing } from 'src/app/item-listings/item-listing.model';

/**
 * Mocks an item listing for tests.
 */
export const mockListing: ItemListing = {
  sellerId: '10',
  title: 'test',
  description: 'test listing',
  price: 10.0,
  imageUrl: '',
  createdAt: '2026-01-01 00:00:00.000000',
  updatedAt: '2026-01-01 00:00:00.000000',
  id: '123',
  sellerUsername: 'testuser',
  isActive: true,
  quantitySold: 0,
  reviewCount: 0,
  averageScore: 0,
  categoryName: 'Uncategorized',
  categorySlug: 'uncategorized',
};
