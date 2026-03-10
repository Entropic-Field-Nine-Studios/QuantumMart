import { TestBed } from '@angular/core/testing';

import { OrderItemService } from './order-item.service';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { OrderItem } from './order-item.model';
import { OrderItemStatus } from './order-item-status.enum';

describe('OrderItemService', () => {
  let service: OrderItemService;
  let httpMock: HttpTestingController;

  const sampleOrderItem: OrderItem = {
    id: '1',
    listingId: '1',
    sellerId: '123',
    quantity: 1,
    listingPrice: 10.0,
    listingTitle: 'test listing',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: provideHttpClientTesting(),
    });
    service = TestBed.inject(OrderItemService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  function expectStatusUpdate(newStatus: OrderItemStatus) {
    const orderItemId = '1';

    service.updateStatus(orderItemId, newStatus).subscribe((res) => {
      expect(res).to.deep.equal(sampleOrderItem);
    });

    const req = httpMock.expectOne(`${service.baseUrl}/${orderItemId}?newStatus=${newStatus}`);
    expect(req.request.method).toBe('PATCH');
    expect(req.request.params.get('newStatus')).toBe(newStatus);

    req.flush(sampleOrderItem);
  }

  it('should PATCH shipped status to order item', () =>
    expectStatusUpdate(OrderItemStatus.SHIPPED));

  it('should PATCH canceled status to order item', () =>
    expectStatusUpdate(OrderItemStatus.CANCELED));
});
