import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PersonNameDirective } from '../../shared/directives/person-name.directive';
import { AddressDirective } from '../../shared/directives/address.directive';
import { CityDirective } from '../../shared/directives/city.directive';
import { MatSelect, MatOption } from '@angular/material/select';
import { ZipCodeDirective } from '../../shared/directives/zip-code.directive';
import { PhoneInputComponent } from '../../shared/inputs/phone-input/phone-input.component';
import { US_STATES } from '../../shared/data/us-states';
import { UserStore } from '../../core/stores/user.store';
import { User } from '../../users/user.model';
import { MatAnchor } from '@angular/material/button';
import { MatCheckbox } from '@angular/material/checkbox';
import { AddressForm } from './address-form.model';

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
  readonly states = US_STATES;

  /**
   * Changes the checkbox at the end to show a more relevant "save address" question.
   */
  @Input() isCheckout = false;

  /**
   * Text for the submit button.
   */
  @Input() submitText = 'Submit';

  @Input({ required: true }) formGroup!: FormGroup;

  /**
   * Emits when the user submits the form.
   */
  @Output() submitted = new EventEmitter<AddressForm>();

  private readonly userStore = inject(UserStore);

  onSubmit() {
    if (this.formGroup.valid) {
      const values = this.formGroup.value!;
      const addressForm: AddressForm = {
        firstName: values.firstName!,
        lastName: values.lastName!,
        addressLine1: values.addressLine1!,
        addressLine2: values.addressLine2,
        city: values.city!,
        state: values.state!,
        zip: values.zip!,
        phone: values.phone!,
        shouldSave: values.shouldSave!,
        makePrimary: values.makePrimary!,
      };

      this.submitted.emit(addressForm);
    }
  }

  private get user(): User {
    return this.userStore.user()!;
  }
}
