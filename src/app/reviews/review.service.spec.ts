import { TestBed } from '@angular/core/testing';

import { ReviewService } from './review.service';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { Review } from './review.model';
import { EditReviewRequest } from './edit-review-request.model';
import { CreateReviewRequest } from './create-review-request.model';

describe('ReviewService', () => {
  let service: ReviewService;
  let httpMock: HttpTestingController;

  const review: Review = {
    id: '123',
    userId: '123',
    username: 'test',
    body: 'review body',
    score: 3,
    isEdited: false,
    createdAt: '2026-01-01 00:00:00.000000',
    updatedAt: '2026-01-01 00:00:00.000000',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: provideHttpClientTesting(),
    });
    service = TestBed.inject(ReviewService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should GET reviews by item listing', () => {
    const mockResponse = [review];

    service.getListingReviews('123').subscribe((res) => {
      expect(res).to.deep.equal(mockResponse);
    });

    const req = httpMock.expectOne(`${service.baseUrl}/listing/123`);
    expect(req.request.method).to.equal('GET');

    req.flush(mockResponse);
  });

  it('should GET reviews by user', () => {
    const mockResponse = [review];

    service.getReviewsByUser('123').subscribe((res) => {
      expect(res).to.deep.equal(mockResponse);
    });

    const req = httpMock.expectOne(`${service.baseUrl}/user/123`);
    expect(req.request.method).to.equal('GET');

    req.flush(mockResponse);
  });

  it('should POST to create review', () => {
    const mockResponse = review;

    const createReq: CreateReviewRequest = {
      body: 'new review',
      score: 4,
    };

    service.createReview('123', createReq).subscribe((res) => {
      expect(res).to.deep.equal(mockResponse);
    });

    const req = httpMock.expectOne(`${service.baseUrl}/listing/123`);
    expect(req.request.method).to.equal('POST');
    expect(req.request.body).to.equal(createReq);

    req.flush(mockResponse);
  });

  it('should PATCH review', () => {
    const mockResponse = review;

    const editReq: EditReviewRequest = {
      newBody: 'new body',
      newScore: 4,
    };

    service.updateReview('123', editReq).subscribe((res) => {
      expect(res).to.deep.equal(mockResponse);
    });

    const req = httpMock.expectOne(`${service.baseUrl}/123`);
    expect(req.request.method).to.equal('PATCH');
    expect(req.request.body).to.equal(editReq);

    req.flush(mockResponse);
  });

  it('should DELETE review', () => {
    service.deleteReview('123').subscribe();

    const req = httpMock.expectOne(`${service.baseUrl}/123`);
    expect(req.request.method).to.equal('DELETE');

    req.flush(null);
  });
});
