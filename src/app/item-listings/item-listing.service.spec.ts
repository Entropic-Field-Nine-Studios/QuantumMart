import { TestBed } from '@angular/core/testing';

import { ItemListingService } from './item-listing.service';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { UpdateItemListing } from './update-listing.model';
import { mockListing } from 'src/testing/mock-item-listing';

describe('ItemListingService', () => {
  let service: ItemListingService;
  let httpMock: HttpTestingController;

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
    const mockResponse = [mockListing];

    service.getAllListings().subscribe((res) => {
      expect(res).to.deep.equal(mockResponse);
    });

    const req = httpMock.expectOne(`${service.baseUrl}`);
    expect(req.request.method).to.equal('GET');

    req.flush(mockResponse);
  });

  it('should GET /seller/:username to retrieve seller listings', () => {
    const sellerUsername = 'seller';
    const mockResponse = [mockListing];

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
      expect(res).to.deep.equal(mockListing);
    });

    const req = httpMock.expectOne(`${service.baseUrl}/${listingId}`);
    expect(req.request.method).to.equal('GET');

    req.flush(mockListing);
  });

  it('should POST to create an item listing', () => {
    service.createListing(mockListing).subscribe((res) => {
      expect(res).to.deep.equal(mockListing);
    });

    const req = httpMock.expectOne(`${service.baseUrl}`);
    expect(req.request.method).to.equal('POST');
    expect(req.request.body).to.equal(mockListing);

    req.flush(mockListing);
  });

  it('should PATCH to edit an item listing', () => {
    const updates: UpdateItemListing = {
      title: 'new title',
    };

    service.updateListing(mockListing.id!, updates).subscribe();

    const req = httpMock.expectOne(`${service.baseUrl}/${mockListing.id}`);
    expect(req.request.method).to.equal('PATCH');
    expect(req.request.body).to.equal(updates);

    req.flush(updates);
  });
});
