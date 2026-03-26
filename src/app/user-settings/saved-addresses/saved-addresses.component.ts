import { Component, effect, inject, signal } from '@angular/core';
import { AddressService } from '../../address/address.service';
import { UserStore } from '../../core/stores/user.store';
import { Address } from '../../address/address.model';
import { HttpErrorResponse } from '@angular/common/http';
import { MessageService } from '../../shared/message/message.service';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { User } from '../../users/user.model';
import { MatAnchor } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';
import { AddressComponent } from '../../address/address.component';

@Component({
  selector: 'app-saved-addresses',
  imports: [MatProgressSpinner, MatAnchor, AddressComponent],
  templateUrl: './saved-addresses.component.html',
  styleUrl: './saved-addresses.component.scss',
})
export class SavedAddressesComponent {
  private readonly addressService = inject(AddressService);
  private readonly userStore = inject(UserStore);
  private readonly messageService = inject(MessageService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  private readonly userAddresses = signal<Address[] | null>(null);

  constructor() {
    effect(() => {
      if (!this.user) return;

      this.loadAddresses();
    });
  }

  loadAddresses() {
    this.addressService.getUserAddresses(this.userStore.user()!.id).subscribe({
      next: (addresses) => this.userAddresses.set(addresses),
      error: (err: HttpErrorResponse) => this.messageService.error(err.message),
    });
  }

  navigateToCreate() {
    return this.router.navigate(['create'], { relativeTo: this.route });
  }

  get addresses(): Address[] | null {
    return this.userAddresses();
  }

  private get user(): User | null {
    return this.userStore.user();
  }
}
