import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemListingComponent } from './item-listing.component';

describe('ItemListing', () => {
  let component: ItemListingComponent;
  let fixture: ComponentFixture<ItemListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemListingComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ItemListingComponent);
    component = fixture.componentInstance;

    component.listing = {
      sellerId: '1',
      description: 'test desc',
      title: 'title',
      price: 2.3,
      imageUrl: 'testurl',
    };

    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
