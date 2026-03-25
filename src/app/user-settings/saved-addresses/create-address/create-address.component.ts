import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AddressService } from '../../../address/address.service';
import { AddressFormComponent } from '../../../address/address-form/address-form.component';
import { MessageService } from '../../../shared/message/message.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { AddressForm } from '../../../address/address-form/address-form.model';
import { AddressUtil } from '../../../shared/utils/address-util';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-create-address',
  imports: [ReactiveFormsModule, AddressFormComponent, MatButtonModule, MatIcon, MatTooltip],
  templateUrl: './create-address.component.html',
  styleUrl: './create-address.component.scss',
})
export class CreateAddressComponent {
  private readonly addressService = inject(AddressService);
  private readonly auth = inject(AuthService);
  private readonly messageService = inject(MessageService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  readonly addressForm = AddressUtil.createAddressForm();

  createAddress(form: AddressForm) {
    const newAddress = AddressUtil.extractData(form, this.auth.userId!);

    this.addressService.createAddress(newAddress).subscribe({
      next: () => {
        this.messageService.success('Your address was created.');
        this.navigateBack();
      },
      error: (err: HttpErrorResponse) => this.messageService.error(err.message),
    });
  }

  navigateBack() {
    this.router.navigate(['..'], { relativeTo: this.route });
  }
}
