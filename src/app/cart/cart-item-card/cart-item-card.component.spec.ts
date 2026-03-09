import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartItemCardComponent } from './cart-item-card.component';

describe('CartItemCardComponent', () => {
  let component: CartItemCardComponent;
  let fixture: ComponentFixture<CartItemCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartItemCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CartItemCardComponent);
    component = fixture.componentInstance;

    component.cartItem = {
      id: '1',
      quantity: 1,
      itemListing: {
        sellerId: '1',
        title: 'test',
        description: '',
        price: 1.0,
        imageUrl: '',
      },
    };

    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
