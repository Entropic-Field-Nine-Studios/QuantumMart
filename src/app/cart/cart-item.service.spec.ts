import { TestBed } from '@angular/core/testing';

import { CartItem } from './cart-item';

describe('CartItem', () => {
  let service: CartItem;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartItem);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
