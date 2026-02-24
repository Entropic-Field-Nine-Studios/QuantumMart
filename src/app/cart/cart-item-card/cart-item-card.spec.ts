import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartItemCard } from './cart-item-card';

describe('CartItemCard', () => {
  let component: CartItemCard;
  let fixture: ComponentFixture<CartItemCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartItemCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartItemCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
