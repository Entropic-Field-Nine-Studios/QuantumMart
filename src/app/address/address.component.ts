import { Component, Input } from '@angular/core';
import { Address } from './address.model';

@Component({
  selector: 'app-address',
  imports: [],
  templateUrl: './address.component.html',
  styleUrl: './address.component.scss',
})
export class AddressComponent {
  @Input({ required: true }) address!: Address;

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
