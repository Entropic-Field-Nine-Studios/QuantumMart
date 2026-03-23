import { TestBed } from '@angular/core/testing';

import { ItemListingService } from './item-listing.service';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ItemListing } from './item-listing.model';

describe('ItemListingService', () => {
  let service: ItemListingService;
  let httpMock: HttpTestingController;

  const listing1: ItemListing = {
    sellerId: '10',
    title: 'test',
    description: 'test listing',
    price: 10.0,
    imageUrl: '',
    createdAt: '2026-01-01 00:00:00.000000',
    updatedAt: '2026-01-01 00:00:00.000000',
    id: '123',
    sellerUsername: 'testuser',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: provideHttpClientTesting(),
    });
    service = TestBed.inject(ItemListingService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should GET all item listings', () => {
    const mockResponse = [listing1];

    service.getAllListings().subscribe((res) => {
      expect(res).to.deep.equal(mockResponse);
    });

    const req = httpMock.expectOne(`${service.baseUrl}`);
    expect(req.request.method).to.equal('GET');

    req.flush(mockResponse);
  });

  it('should GET /seller/:username to retrieve seller listings', () => {
    const sellerUsername = 'seller';
    const mockResponse = [listing1];

    service.getAllListingsByUsername(sellerUsername).subscribe((res) => {
      expect(res).to.deep.equal(mockResponse);
    });

    const req = httpMock.expectOne(`${service.baseUrl}/seller/${sellerUsername}`);
    expect(req.request.method).to.equal('GET');

    req.flush(mockResponse);
  });

  it('should GET /:id item listing by id', () => {
    const listingId = '123';

    service.getListingById(listingId).subscribe((res) => {
      expect(res).to.deep.equal(listing1);
    });

    const req = httpMock.expectOne(`${service.baseUrl}/${listingId}`);
    expect(req.request.method).to.equal('GET');

    req.flush(listing1);
  });

  it('should POST to create an item listing', () => {
    service.createListing(listing1).subscribe((res) => {
      expect(res).to.deep.equal(listing1);
    });

    const req = httpMock.expectOne(`${service.baseUrl}`);
    expect(req.request.method).to.equal('POST');
    expect(req.request.body).to.equal(listing1);

    req.flush(listing1);
  });
});
