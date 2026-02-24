import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartItemCardList } from './cart-item-card-list';

describe('CartItemCardList', () => {
  let component: CartItemCardList;
  let fixture: ComponentFixture<CartItemCardList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartItemCardList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartItemCardList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
