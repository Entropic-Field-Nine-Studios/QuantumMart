import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAddressComponent } from './create-address.component';

describe('CreateAddressComponent', () => {
  let component: CreateAddressComponent;
  let fixture: ComponentFixture<CreateAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateAddressComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateAddressComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
