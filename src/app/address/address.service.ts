import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Address } from './address.model';

@Injectable({
  providedIn: 'root',
})
export class AddressService {
  readonly baseUrl = `${environment.apiUrl}/address`;

  private readonly http = inject(HttpClient);

  /**
   * Retrieves every address saved under a user.
   *
   * @param userId
   * @returns
   */
  getUserAddresses(userId: string): Observable<Address[]> {
    return this.http.get<Address[]>(`${this.baseUrl}/user/${userId}`);
  }

  /**
   * Retrieves the primary address of a user.
   *
   * @param userId
   * @returns
   */
  getUserPrimaryAddress(userId: string): Observable<Address> {
    return this.http.get<Address>(`${this.baseUrl}/primary/${userId}`);
  }

  /**
   * Saves a new address to the database.
   *
   * @param address
   * @returns
   */
  createAddress(address: Address): Observable<Address> {
    return this.http.post<Address>(`${this.baseUrl}`, address);
  }

  /**
   * Deletes an address.
   *
   * @param addressId
   * @returns
   */
  deleteAddress(addressId: string): Observable<object> {
    return this.http.delete(`${this.baseUrl}/${addressId}`);
  }
}
