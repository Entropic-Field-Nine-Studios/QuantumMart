import { TestBed } from '@angular/core/testing';

import { ItemListingService } from './item-listing.service';

describe('ItemListingService', () => {
  let service: ItemListingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItemListingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
