import { TestBed } from '@angular/core/testing';

import { CartItemService } from './cart-item.service';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { expect } from 'chai';
import { CartItem } from './cart-item.model';
import { AuthService } from '../auth/auth.service';
import { MockAuthService } from 'src/testing/mock-auth.service';
import { mockListing } from 'src/testing/mock-item-listing';
import { AddCartItemRequest } from './add-cart-item-request.model';

describe('CartItemService', () => {
  let service: CartItemService;
  let httpMock: HttpTestingController;

  const cartItem1: CartItem = {
    id: '1',
    quantity: 1,
    itemListing: mockListing,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useClass: MockAuthService },
        ...provideHttpClientTesting(),
      ],
    });

    service = TestBed.inject(CartItemService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should POST to cart item service', () => {
    const userId = '5';

    const addItemRequest: AddCartItemRequest = {
      userId: userId,
      guestSessionId: null,
      listingInfo: mockListing,
      itemQuantity: 1,
    };

    service.addItemToCart(addItemRequest).subscribe((res) => {
      expect(res).to.deep.equal(cartItem1);
    });

    const req = httpMock.expectOne(`${service.baseUrl}`);
    expect(req.request.method).to.equal('POST');
    expect(req.request.body).to.equal(addItemRequest);

    req.flush(cartItem1);
  });

  it('should DELETE /user/:userId to clear the cart', () => {
    const userId = '123';
    const mockResponse = { success: true };

    service.clearUserCart(userId).subscribe((res) => {
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

    service.removeItemFromUserCart(userId, listingId).subscribe((res) => {
      expect(res).to.deep.equal(mockResponse);
    });

    const req = httpMock.expectOne(`${service.baseUrl}/user/${userId}/listing/${listingId}`);
    expect(req.request.method).to.equal('DELETE');

    req.flush(mockResponse);
  });

  it('should DELETE /guest/:guestId to clear the guest cart', () => {
    const guestId = '123';
    const mockResponse = { success: true };

    service.clearGuestCart(guestId).subscribe((res) => {
      expect(res).to.deep.equal(mockResponse);
    });

    const req = httpMock.expectOne(`${service.baseUrl}/guest/${guestId}`);
    expect(req.request.method).to.equal('DELETE');

    req.flush(mockResponse);
  });

  it('should DELETE /guest/:guestId/listing/:listingId to remove item from cart', () => {
    const guestId = '123';
    const listingId = '321';
    const mockResponse = { success: true };

    service.removeItemFromGuestCart(guestId, listingId).subscribe((res) => {
      expect(res).to.deep.equal(mockResponse);
    });

    const req = httpMock.expectOne(`${service.baseUrl}/guest/${guestId}/listing/${listingId}`);
    expect(req.request.method).to.equal('DELETE');

    req.flush(mockResponse);
  });
});
