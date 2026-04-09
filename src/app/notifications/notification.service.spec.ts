import { TestBed } from '@angular/core/testing';

import { NotificationService } from './notification.service';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { Notification } from './notification.model';

describe('NotificationService', () => {
  let service: NotificationService;
  let httpMock: HttpTestingController;

  const notif: Notification = {
    id: '123',
    message: 'test',
    route: '/test',
    createdAt: '2026-01-01 00:00:00.000000',
    readAt: null,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: provideHttpClientTesting(),
    });
    service = TestBed.inject(NotificationService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should GET all active notifications for user', () => {
    const mockResponse = [notif];

    service.getNotifications('123').subscribe((res) => {
      expect(res).to.deep.equal(mockResponse);
    });

    const req = httpMock.expectOne(`${service.baseUrl}/user/123`);
    expect(req.request.method).to.equal('GET');

    req.flush(mockResponse);
  });

  it('should PATCH read notification', () => {
    const mockResponse = {};

    service.readNotification('123').subscribe((res) => {
      expect(res).to.deep.equal(mockResponse);
    });

    const req = httpMock.expectOne(`${service.baseUrl}/123/read`);
    expect(req.request.method).to.equal('PATCH');

    req.flush(mockResponse);
  });

  it('should PATCH hide notification', () => {
    const mockResponse = {};

    service.hideNotification('123').subscribe((res) => {
      expect(res).to.deep.equal(mockResponse);
    });

    const req = httpMock.expectOne(`${service.baseUrl}/123/hide`);
    expect(req.request.method).to.equal('PATCH');

    req.flush(mockResponse);
  });

  it('should PATCH hide ALL notification', () => {
    const mockResponse = {};

    service.hideAllNotifications('123').subscribe((res) => {
      expect(res).to.deep.equal(mockResponse);
    });

    const req = httpMock.expectOne(`${service.baseUrl}/user/123/hideAll`);
    expect(req.request.method).to.equal('PATCH');

    req.flush(mockResponse);
  });
});
