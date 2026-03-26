import { TestBed } from '@angular/core/testing';
import { AddressService } from './address.service';
import { Address } from './address.model';

import { expect } from 'chai';

import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('AddressService', () => {
  let service: AddressService;
  let httpMock: HttpTestingController;

  const mockAddress: Address = {
    id: 'addr-1',
    userId: 'user-1',
    firstName: 'Matt',
    lastName: 'Test',
    addressLine1: '123 Test St',
    addressLine2: '',
    city: 'Chicago',
    state: 'IL',
    zip: '60000',
    phone: '555-5555',
    isPrimary: true,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()],
    });

    service = TestBed.inject(AddressService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should GET all addresses for a user', () => {
    const userId = 'user-1';
    const mockResponse = [mockAddress];

    service.getUserAddresses(userId).subscribe((res) => {
      expect(res).to.deep.equal(mockResponse);
    });

    const req = httpMock.expectOne(`${service.baseUrl}/user/${userId}`);
    expect(req.request.method).to.equal('GET');

    req.flush(mockResponse);
  });

  it('should GET the primary address for a user', () => {
    const userId = 'user-1';

    service.getUserPrimaryAddress(userId).subscribe((res) => {
      expect(res).to.deep.equal(mockAddress);
    });

    const req = httpMock.expectOne(`${service.baseUrl}/primary/${userId}`);
    expect(req.request.method).to.equal('GET');

    req.flush(mockAddress);
  });

  it('should POST a new address', () => {
    service.createAddress(mockAddress).subscribe((res) => {
      expect(res).to.deep.equal(mockAddress);
    });

    const req = httpMock.expectOne(`${service.baseUrl}`);
    expect(req.request.method).to.equal('POST');
    expect(req.request.body).to.deep.equal(mockAddress);

    req.flush(mockAddress);
  });

  it('should DELETE an address', () => {
    const addressId = 'addr-1';
    const mockResponse = { success: true };

    service.deleteAddress(addressId).subscribe((res) => {
      expect(res).to.deep.equal(mockResponse);
    });

    const req = httpMock.expectOne(`${service.baseUrl}/${addressId}`);
    expect(req.request.method).to.equal('DELETE');

    req.flush(mockResponse);
  });
});
