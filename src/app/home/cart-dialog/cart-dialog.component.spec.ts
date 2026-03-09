import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartDialogComponent } from './cart-dialog.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

describe('CartDialogComponent', () => {
  let component: CartDialogComponent;
  let fixture: ComponentFixture<CartDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartDialogComponent],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: { userId: '1' } },
        { provide: MatDialogRef, useValue: {} },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CartDialogComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
