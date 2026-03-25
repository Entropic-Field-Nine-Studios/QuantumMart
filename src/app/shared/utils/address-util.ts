import { AddressForm } from '../../address/address-form/address-form.model';
import { Address } from '../../address/address.model';

/**
 * Contains a set of helper functions for displaying an address.
 */
export class AddressUtil {
  private constructor() {}

  /**
   * First name and last name.
   *
   * @param address
   * @returns
   */
  static fullName(address: Address): string {
    return `${address.firstName} ${address.lastName}`;
  }

  /**
   * Number, street, and additional unit/apt info if provided.
   *
   * @param address
   * @returns
   */
  static addressPart1(address: Address): string {
    if (address.addressLine2) {
      return `${address.addressLine1} ${address.addressLine2}`;
    } else {
      return address.addressLine1;
    }
  }

  /**
   * City, state and ZIP.
   *
   * @param address
   * @returns
   */
  static addressPart2(address: Address): string {
    return `${address.city}, ${address.state} ${address.zip}`;
  }

  /**
   * Displays the full formatted address.
   *
   * @param address
   * @returns
   */
  static fullAddress(address: Address): string {
    return `${this.addressPart1(address)}, ${this.addressPart2(address)}`;
  }

  /**
   * Takes values from an address form and returns it as an Address entity.
   *
   * @param form
   * @returns
   */
  static extractData(form: AddressForm): Address {
    const address: Address = {
      userId: form.userId,
      isPrimary: form.makePrimary,
      firstName: form.firstName,
      lastName: form.lastName,
      addressLine1: form.addressLine1,
      addressLine2: form.addressLine2,
      city: form.city,
      state: form.state,
      zip: form.zip,
      phone: form.phone,
    };

    return address;
  }
}
