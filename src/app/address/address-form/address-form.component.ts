import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PersonNameDirective } from '../../shared/directives/person-name.directive';
import { AddressDirective } from '../../shared/directives/address.directive';
import { CityDirective } from '../../shared/directives/city.directive';
import { MatSelect, MatOption } from '@angular/material/select';
import { ZipCodeDirective } from '../../shared/directives/zip-code.directive';
import { PhoneInputComponent } from '../../shared/inputs/phone-input/phone-input.component';
import { US_STATES } from '../../shared/data/us-states';
import { Address } from '../address.model';
import { UserStore } from '../../core/stores/user.store';
import { User } from '../../users/user.model';
import { MatAnchor } from '@angular/material/button';
import { MatCheckbox } from '@angular/material/checkbox';

@Component({
  selector: 'app-address-form',
  imports: [
    MatFormField,
    MatLabel,
    MatInput,
    FormsModule,
    ReactiveFormsModule,
    PersonNameDirective,
    AddressDirective,
    CityDirective,
    MatSelect,
    MatOption,
    ZipCodeDirective,
    PhoneInputComponent,
    MatAnchor,
    MatCheckbox,
  ],
  templateUrl: './address-form.component.html',
  styleUrl: './address-form.component.scss',
})
export class AddressFormComponent {
  readonly addressForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    addressLine1: new FormControl('', Validators.required),
    addressLine2: new FormControl<string | null>(null),
    city: new FormControl('', Validators.required),
    state: new FormControl('', Validators.required),
    zip: new FormControl('', [Validators.required, Validators.pattern('[0-9]+(|-[0-9]{4})')]),
    phone: new FormControl(''),
    isPrimary: new FormControl(false),
  });

  readonly states = US_STATES;

  /**
   * Text for the submit button.
   */
  @Input() submitBtn = 'Submit';

  /**
   * Emits when the user submits the form.
   */
  @Output() submitted = new EventEmitter<Address>();

  private readonly userStore = inject(UserStore);

  onSubmit() {
    if (this.addressForm.valid) {
      const values = this.addressForm.value!;
      const address: Address = {
        userId: this.user.id!,
        isPrimary: values.isPrimary!,
        firstName: values.firstName!,
        lastName: values.lastName!,
        addressLine1: values.addressLine1!,
        addressLine2: values.addressLine2,
        city: values.city!,
        state: values.state!,
        zip: values.zip!,
      };

      this.submitted.emit(address);
    }
  }

  private get user(): User {
    return this.userStore.user()!;
  }
}
