import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemListingComponent } from './item-listing';

describe('ItemListing', () => {
  let component: ItemListingComponent;
  let fixture: ComponentFixture<ItemListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemListingComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ItemListingComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
