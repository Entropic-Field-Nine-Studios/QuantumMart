import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedAddressesComponent } from './saved-addresses.component';

describe('SavedAddressesComponent', () => {
  let component: SavedAddressesComponent;
  let fixture: ComponentFixture<SavedAddressesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SavedAddressesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SavedAddressesComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
