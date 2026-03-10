import { TestBed } from '@angular/core/testing';

import { CartItemService } from './cart-item.service';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { expect } from 'chai';
import { CartItem } from './cart-item.model';
import { ItemListing } from '../item-listings/item-listing.model';

describe('CartItemService', () => {
  let service: CartItemService;
  let httpMock: HttpTestingController;

  const itemListing: ItemListing = {
    sellerId: '10',
    title: 'test',
    description: 'test listing',
    price: 10.0,
    imageUrl: '',
    createdAt: '2026-01-01 00:00:00.000000',
    updatedAt: '2026-01-01 00:00:00.000000',
    id: '123',
    sellerUsername: 'testuser',
  };

  const cartItem1: CartItem = {
    id: '1',
    quantity: 1,
    itemListing: itemListing,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: provideHttpClientTesting(),
    });
    service = TestBed.inject(CartItemService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it("should GET user's cart items", () => {
    const userId = '5';
    const mockResponse = [cartItem1];

    service.getCartItemsByUserId(userId).subscribe((res) => {
      expect(res).to.deep.equal(mockResponse);
    });

    const req = httpMock.expectOne(`${service.baseUrl}/user/${userId}`);
    expect(req.request.method).to.equal('GET');

    req.flush(mockResponse);
  });

  it('should POST to cart item service', () => {
    const userId = '5';

    service.addItemToCart(userId, itemListing).subscribe((res) => {
      expect(res).to.deep.equal(cartItem1);
    });

    const req = httpMock.expectOne(`${service.baseUrl}/user/${userId}`);
    expect(req.request.method).to.equal('POST');
    expect(req.request.body).to.equal(itemListing);

    req.flush(cartItem1);
  });

  it('should DELETE /user/:userId to clear the cart', () => {
    const userId = '123';
    const mockResponse = { success: true };

    service.clearCart(userId).subscribe((res) => {
      expect(res).to.deep.equal(mockResponse);
    });

    const req = httpMock.expectOne(`${service.baseUrl}/user/${userId}`);
    expect(req.request.method).to.equal('DELETE');

    req.flush(mockResponse);
  });

  it('should DELETE /user/:userId/listing/:listingId to remove item from cart', () => {
    const userId = '123';
    const listingId = '321';
    const mockResponse = { success: true };

    service.removeItemFromCart(userId, listingId).subscribe((res) => {
      expect(res).to.deep.equal(mockResponse);
    });

    const req = httpMock.expectOne(`${service.baseUrl}/user/${userId}/listing/${listingId}`);
    expect(req.request.method).to.equal('DELETE');

    req.flush(mockResponse);
  });
});
