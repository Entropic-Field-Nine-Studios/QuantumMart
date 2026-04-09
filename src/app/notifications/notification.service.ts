import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Notification } from './notification.model';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  readonly baseUrl = `${environment.apiUrl}/notifications`;

  private readonly http = inject(HttpClient);

  /**
   * Retrieves a user's active notifications. Sorted by newest first.
   *
   * @param userId
   * @returns
   */
  getNotifications(userId: string): Observable<Notification[]> {
    return this.http.get<Notification[]>(`${this.baseUrl}/user/${userId}`);
  }

  /**
   * Marks a notification as read.
   *
   * @param notificationId
   * @returns
   */
  readNotification(notificationId: string): Observable<object> {
    return this.http.patch(`${this.baseUrl}/${notificationId}/read`, {});
  }

  /**
   * "Deletes" a notification for a user.
   *
   * @param notificationId
   * @returns
   */
  hideNotification(notificationId: string): Observable<object> {
    return this.http.patch(`${this.baseUrl}/${notificationId}/hide`, {});
  }

  /**
   * Hides all active notifications for a user.
   *
   * @param userId
   * @returns
   */
  hideAllNotifications(userId: string): Observable<object> {
    return this.http.patch(`${this.baseUrl}/user/${userId}/hideAll`, {});
  }
}
