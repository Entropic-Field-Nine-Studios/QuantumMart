import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderItemComponent } from './order-item.component';

describe('OrderItemComponent', () => {
  let component: OrderItemComponent;
  let fixture: ComponentFixture<OrderItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OrderItemComponent);
    component = fixture.componentInstance;

    component.itemInfo = {
      listingId: '1',
      sellerId: '1-2',
      quantity: 1,
      listingPrice: 1.0,
      listingTitle: 'TestListing',
    };

    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
