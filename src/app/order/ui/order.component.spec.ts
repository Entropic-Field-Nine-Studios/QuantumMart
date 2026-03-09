import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderComponent } from './order.component';
import { OrderStatus } from '../order-status.enum';

describe('OrderComponent', () => {
  let component: OrderComponent;
  let fixture: ComponentFixture<OrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OrderComponent);
    component = fixture.componentInstance;

    component.order = {
      buyerId: '1',
      status: OrderStatus.PENDING,
      totalPaid: 50.0,
      shippingFirstname: 'john',
      shippingLastname: 'smith',
      shippingAddress1: '123 Lane',
      shippingCity: 'Salt Lake City',
      shippingState: 'New York',
      shippingZip: '65728',
      shippingPhone: '5552931029',
    };

    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
