import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartDialog } from './cart-dialog';

describe('CartDialog', () => {
  let component: CartDialog;
  let fixture: ComponentFixture<CartDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
