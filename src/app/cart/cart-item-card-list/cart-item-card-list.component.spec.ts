import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartItemCardListComponent } from './cart-item-card-list.component';

describe('CartItemCardList', () => {
  let component: CartItemCardListComponent;
  let fixture: ComponentFixture<CartItemCardListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartItemCardListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CartItemCardListComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
