import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressComponent } from './address.component';

describe('AddressComponent', () => {
  let component: AddressComponent;
  let fixture: ComponentFixture<AddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddressComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddressComponent);
    component = fixture.componentInstance;
    component.address = {
      id: '123',
      isPrimary: true,
      userId: '123',
      firstName: 'test',
      lastName: 'test',
      addressLine1: 'test',
      city: 'test',
      state: 'test',
      zip: 'test',
      phone: '5555555555',
    };

    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
