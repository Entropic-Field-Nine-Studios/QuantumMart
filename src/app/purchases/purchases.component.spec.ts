import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchasesComponent } from './purchases.component';
import { UserStore } from '../core/stores/user.store';
import { signal } from '@angular/core';

describe('PurchasesComponent', () => {
  let component: PurchasesComponent;
  let fixture: ComponentFixture<PurchasesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PurchasesComponent],
      providers: [
        {
          provide: UserStore,
          useValue: {
            user: signal({ id: 123 }),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PurchasesComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
