import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Review } from './review.model';
import { CreateReviewRequest } from './create-review/create-review-request.model';
import { EditReviewRequest } from './edit-review-request.model';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  readonly baseUrl = `${environment.apiUrl}/reviews`;

  private readonly http = inject(HttpClient);

  /**
   * Retrieves every review belonging to an item listing.
   *
   * @param listingId
   * @returns
   */
  getListingReviews(listingId: string): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.baseUrl}/listing/${listingId}`);
  }

  /**
   * Retrieves every review made by a user.
   *
   * @param userId
   * @returns
   */
  getReviewsByUser(userId: string): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.baseUrl}/user/${userId}`);
  }

  /**
   * Saves a review entry if the request and user satisfies all requirements.
   *
   * @param listingId
   * @param request
   * @returns
   */
  createReview(listingId: string, request: CreateReviewRequest): Observable<Review> {
    return this.http.post<Review>(`${this.baseUrl}/listing/${listingId}`, request);
  }

  /**
   * Modifies an existing review entry.
   *
   * @param reviewId
   * @param request
   * @returns The new review object
   */
  updateReview(reviewId: string, request: EditReviewRequest): Observable<Review> {
    return this.http.patch<Review>(`${this.baseUrl}/${reviewId}`, request);
  }

  /**
   * Deletes a review entry.
   *
   * @param reviewId
   * @returns
   */
  deleteReview(reviewId: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${reviewId}`);
  }
}
