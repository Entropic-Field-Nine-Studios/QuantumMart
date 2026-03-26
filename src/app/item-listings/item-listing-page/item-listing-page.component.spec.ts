import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemListingListComponent } from '../item-listing-list/item-listing-list.component';

describe('ItemListingListComponent', () => {
  let component: ItemListingListComponent;
  let fixture: ComponentFixture<ItemListingListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemListingListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ItemListingListComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
