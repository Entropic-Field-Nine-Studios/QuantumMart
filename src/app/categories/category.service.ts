import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Category } from './category.model';
import { CreateCategoryRequest } from './create-category-request.model';
import { PatchCategoryRequest } from './patch-category-request.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  readonly baseUrl = `${environment.apiUrl}/categories`;

  private readonly http = inject(HttpClient);

  /**
   * Retrieves only categories marked as active.
   *
   * @returns
   */
  getActiveCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.baseUrl}`);
  }

  /**
   * Retrieves both active and inactive categories. Requires admin permission.
   *
   * @returns
   */
  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.baseUrl}/all`);
  }

  /**
   * Saves a category to the database. Requires admin permission.
   *
   * @param req
   * @returns
   */
  createCategory(req: CreateCategoryRequest): Observable<Category> {
    return this.http.post<Category>(`${this.baseUrl}`, req);
  }

  /**
   * Changes properties on a category. Requires admin permission.
   *
   * @param categoryId UUID of the category to change.
   * @param req Changes to be made.
   * @returns
   */
  updateCategory(categoryId: string, req: PatchCategoryRequest): Observable<void> {
    return this.http.patch<void>(`${this.baseUrl}/${categoryId}`, req);
  }
}
