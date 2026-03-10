import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { User } from './user.model';
import { RegisterUserInfo } from './register-user-info.model';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  const sampleUser: User = {
    username: 'test',
    email: 'test@tester.com',
    id: '1',
    role: 'user',
    balance: 1000.0,
    createdAt: '2026-01-01 00:00:0000',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: provideHttpClientTesting(),
    });
    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should POST to create a user', () => {
    const mockRequest: RegisterUserInfo = {
      username: 'test',
      rawPassword: 'test123',
      email: 'test@testuser.com',
    };

    service.createUser(mockRequest).subscribe((res) => {
      expect(res).to.deep.equal(sampleUser);
    });

    const req = httpMock.expectOne(service.baseUrl);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).to.deep.equal(mockRequest);

    req.flush(sampleUser);
  });

  it('should GET /:id to retrieve a user', () => {
    const userId = '123';

    service.getUserById(userId).subscribe((res) => {
      expect(res).to.deep.equal(sampleUser);
    });

    const req = httpMock.expectOne(`${service.baseUrl}/${userId}`);
    expect(req.request.method).toBe('GET');

    req.flush(sampleUser);
  });
});
