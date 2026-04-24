import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AddressForm } from '../../address/address-form/address-form.model';
import { Address } from '../../address/address.model';

/**
 * Contains a set of helper functions for displaying an address.
 */
export class AddressUtil {
  private constructor() {
    // Intentionally hidden
  }

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
   * @param userId User ID to associate the address with.
   * @returns
   */
  static extractData(form: AddressForm, userId: string): Address {
    const address: Address = {
      userId: userId,
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

  /**
   * Fills out form values using an existing address.
   *
   * @param address
   * @param form
   */
  static autofillForm(address: Address, form: FormGroup) {
    form.patchValue({
      firstName: address.firstName,
      lastName: address.lastName,
      addressLine1: address.addressLine1,
      addressLine2: address.addressLine2 ?? null,
      city: address.city,
      state: address.state,
      zip: address.zip,
      phone: address.phone,
      makePrimary: false,
      shouldSave: false,
    });

    form.markAllAsTouched();
  }

  /**
   * Initializes a form group to be used with the address form component.
   *
   * @returns
   */
  static createAddressForm(isGuest = false): FormGroup {
    return new FormGroup({
      guestEmail: new FormControl(null, isGuest ? Validators.required : []),
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      addressLine1: new FormControl('', Validators.required),
      addressLine2: new FormControl<string | null>(null),
      city: new FormControl('', Validators.required),
      state: new FormControl('', Validators.required),
      zip: new FormControl('', [Validators.required, Validators.pattern('[0-9]+(|-[0-9]{4})')]),
      phone: new FormControl(''),
      makePrimary: new FormControl(false),
      shouldSave: new FormControl(false),
    });
  }
}
