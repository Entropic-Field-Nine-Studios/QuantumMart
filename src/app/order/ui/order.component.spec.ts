import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderComponent } from './order.component';
import { OrderStatus } from '../order-status.enum';
import { Order } from '../order.model';

describe('OrderComponent', () => {
  let component: OrderComponent;
  let fixture: ComponentFixture<OrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OrderComponent);
    component = fixture.componentInstance;

    const sampleOrder: Order = {
      id: '1',
      buyerId: '1',
      guestEmail: null,
      status: OrderStatus.PENDING,
      totalPaid: 50.0,
      shippingFirstname: 'john',
      shippingLastname: 'smith',
      shippingAddress1: '123 Lane',
      shippingAddress2: null,
      shippingCity: 'Salt Lake City',
      shippingState: 'New York',
      shippingZip: '65728',
      shippingPhone: '5552931029',
      createdAt: '',
      orderItems: [],
    };

    component.order = sampleOrder;

    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
