import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAddressComponent } from './create-address.component';
import { provideRouter } from '@angular/router';

describe('CreateAddressComponent', () => {
  let component: CreateAddressComponent;
  let fixture: ComponentFixture<CreateAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideRouter([])],
      imports: [CreateAddressComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateAddressComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
