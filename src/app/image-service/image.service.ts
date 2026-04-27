import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  readonly baseUrl = `${environment.apiUrl}/images`;

  private readonly http = inject(HttpClient);

  /**
   * Uploads a new image to the backend storage.
   *
   * @param file
   * @returns URL of the image.
   */
  uploadImage(file: File): Observable<string> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post(`${this.baseUrl}/upload`, formData, { responseType: 'text' as const });
  }
}
