import { Component, inject, Input } from '@angular/core';
import { Address } from './address.model';
import { AddressService } from './address.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatMenuTrigger, MatMenu, MatMenuItem } from '@angular/material/menu';
import { MessageService } from '../shared/message/message.service';
import { ConfirmDialogService } from '../shared/dialogs/confirm-dialog.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatRadioButton } from '@angular/material/radio';

@Component({
  selector: 'app-address',
  imports: [MatButtonModule, MatIcon, MatMenuTrigger, MatMenu, MatMenuItem, MatRadioButton],
  templateUrl: './address.component.html',
  styleUrl: './address.component.scss',
})
export class AddressComponent {
  @Input({ required: true }) address!: Address;

  /**
   * Whether to show the dropdown button displaying quick actions the user can
   * perform on the address, such as deleting the address.
   */
  @Input() editable = false;

  /**
   * Shows a radio button that selects this address.
   */
  @Input() selectable = false;

  /**
   * If the radio button on this address should be selected.
   */
  @Input() selected = false;

  private readonly addressService = inject(AddressService);
  private readonly messageService = inject(MessageService);
  private readonly confirmDialog = inject(ConfirmDialogService);

  deleteAddress() {
    if (this.editable) {
      this.confirmDialog.confirm('Delete this address?').subscribe((confirmed) => {
        if (confirmed) {
          this.addressService.deleteAddress(this.address.id!).subscribe({
            next: () => {
              this.messageService.success('Address deleted.');
              this.editable = false;
            },
            error: (err: HttpErrorResponse) => this.messageService.error(err.message),
          });
        }
      });
    }
  }

  get fullName(): string {
    return this.address.firstName + ' ' + this.address.lastName;
  }

  get addressPart1(): string {
    const part2 = this.address.addressLine2;

    let baseAddress = this.address.addressLine1;

    if (part2) {
      baseAddress += ' ' + part2;
    }

    return baseAddress;
  }

  get addressPart2(): string {
    return this.address.city + ', ' + this.address.state + ' ' + this.address.zip;
  }
}
