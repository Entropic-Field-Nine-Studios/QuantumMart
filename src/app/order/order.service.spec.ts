import { TestBed } from '@angular/core/testing';

import { OrderService } from './order.service';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { Order } from './order.model';
import { OrderStatus } from './order-status.enum';
import { CreateOrderRequest } from './create-order-request.model';

describe('OrderService', () => {
  let service: OrderService;
  let httpMock: HttpTestingController;

  const sampleOrder: Order = {
    id: '1',
    buyerId: '1',
    guestEmail: null,
    status: OrderStatus.PENDING,
    totalPaid: 12.0,
    shippingFirstname: 'test',
    shippingLastname: 'guy',
    shippingAddress1: '123 Road Lane',
    shippingAddress2: null,
    shippingCity: 'Quahog',
    shippingState: 'Rhode Island',
    shippingPhone: '5552981029',
    shippingZip: '61029',
    createdAt: '',
    orderItems: [],
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: provideHttpClientTesting(),
    });
    service = TestBed.inject(OrderService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should GET /userId/:userId all orders by user', () => {
    const userId = '123';

    service.getOrdersByUserId(userId).subscribe((res) => {
      expect(res).to.deep.equal([sampleOrder]);
    });

    const req = httpMock.expectOne(`${service.baseUrl}/user/${userId}`);
    expect(req.request.method).to.equal('GET');

    req.flush([sampleOrder]);
  });

  function expectRelevantOrders(unfinished: boolean) {
    const sellerId = '123';

    service.getOrdersRelevantToSeller(sellerId, unfinished).subscribe((res) => {
      expect(res).to.deep.equal([sampleOrder]);
    });

    const req = httpMock.expectOne(
      `${service.baseUrl}/seller/${sellerId}?unfinished=${unfinished}`,
    );
    expect(req.request.method).to.equal('GET');
    expect(req.request.params.get('unfinished')).toBe(`${unfinished}`);

    req.flush([sampleOrder]);
  }

  it('should GET /sellerId/:sellerId relevant seller orders unfinished', () =>
    expectRelevantOrders(true));

  it('should GET /sellerId/:sellerId relevant seller orders finished', () =>
    expectRelevantOrders(false));

  it('should POST to create an order', () => {
    const createOrderReq: CreateOrderRequest = {
      buyerId: '1',
      guestEmail: null,
      guestSessionId: null,
      totalPaid: 12.0,
      shippingFirstname: 'test',
      shippingLastname: 'guy',
      shippingAddress1: '123 Road Lane',
      shippingAddress2: null,
      shippingCity: 'Quahog',
      shippingState: 'Rhode Island',
      shippingPhone: '5552981029',
      shippingZip: '61029',
    };

    service.createOrder(createOrderReq).subscribe((res) => {
      expect(res).to.deep.equal(sampleOrder);
    });

    const req = httpMock.expectOne(`${service.baseUrl}`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).to.deep.equal(createOrderReq);

    req.flush(sampleOrder);
  });
});
