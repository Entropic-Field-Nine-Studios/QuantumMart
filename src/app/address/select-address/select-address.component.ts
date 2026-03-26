import { Component, computed, EventEmitter, inject, OnInit, Output, signal } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { AddressService } from '../address.service';
import { Address } from '../address.model';
import { HttpErrorResponse } from '@angular/common/http';
import { MessageService } from '../../shared/message/message.service';
import { MatRadioGroup } from '@angular/material/radio';
import { AddressComponent } from '../address.component';
import { FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-select-address',
  imports: [MatRadioGroup, AddressComponent, ReactiveFormsModule],
  templateUrl: './select-address.component.html',
  styleUrl: './select-address.component.scss',
})
export class SelectAddressComponent implements OnInit {
  private readonly auth = inject(AuthService);
  private readonly addressService = inject(AddressService);
  private readonly messageService = inject(MessageService);

  private readonly _addresses = signal<Address[]>([]);

  private readonly primary = computed(() => this.getPrimary(this._addresses()));

  private readonly secondaries = computed(() =>
    this._addresses().filter((item) => !item.isPrimary),
  );

  readonly addressControl = new FormControl<Address | null>(null);

  /**
   * Emits when the user selects a saved address.
   */
  @Output() addressSelected = new EventEmitter<Address | null>();

  ngOnInit(): void {
    this.addressService.getUserAddresses(this.auth.userId!).subscribe({
      next: (addresses) => {
        this._addresses.set(addresses);
        this.addressSelected.emit(this.getPrimary(addresses));
      },
      error: (err: HttpErrorResponse) => this.messageService.error(err.message),
    });

    this.addressControl.valueChanges.subscribe((address) => {
      this.addressSelected.emit(address);
    });
  }

  private getPrimary(addresses: Address[]): Address | null {
    return addresses.find((item) => item.isPrimary) ?? null;
  }

  get primaryAddress(): Address | null {
    return this.primary();
  }

  get otherAddresses(): Address[] {
    return this.secondaries();
  }
}
