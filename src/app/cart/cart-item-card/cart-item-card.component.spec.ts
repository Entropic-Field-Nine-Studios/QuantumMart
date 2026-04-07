import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartItemCardComponent } from './cart-item-card.component';
import { SinonSpy, spy } from 'sinon';
import { CartItem } from '../cart-item.model';

describe('CartItemCardComponent', () => {
  let component: CartItemCardComponent;
  let fixture: ComponentFixture<CartItemCardComponent>;
  let openSpy: SinonSpy;

  const mockItem: CartItem = {
    id: '1',
    quantity: 1,
    itemListing: {
      sellerId: '1',
      title: 'test',
      description: '',
      price: 1.0,
      imageUrl: '',
      isActive: true,
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartItemCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CartItemCardComponent);
    openSpy = spy();
    component = fixture.componentInstance;

    component.cartItem = mockItem;

    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit removeItem with the itemListing', () => {
    component.removeItem.subscribe(openSpy);

    component.cartItem = mockItem;
    fixture.detectChanges();

    component.onRemove();

    expect(openSpy.calledOnce).to.equal(true);
    expect(openSpy.firstCall.args[0]).to.deep.equal(mockItem.itemListing);
  });
});
