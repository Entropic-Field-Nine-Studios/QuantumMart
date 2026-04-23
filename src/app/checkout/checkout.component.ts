import { Component, inject, OnInit, signal, ViewChild } from '@angular/core';
import { CartItemService } from '../cart/cart-item.service';
import { AuthService } from '../auth/auth.service';
import { CartItem } from '../cart/cart-item.model';
import { HttpErrorResponse } from '@angular/common/http';
import { CartItemCardListComponent } from '../cart/cart-item-card-list/cart-item-card-list.component';
import { CurrencyPipe } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatAnchor } from '@angular/material/button';
import { MatStepper, MatStepperModule } from '@angular/material/stepper';
import { OrderService } from '../order/order.service';
import { Router } from '@angular/router';
import { MessageService } from '../shared/message/message.service';
import { AddressFormComponent } from '../address/address-form/address-form.component';
import { Address } from '../address/address.model';
import { AddressUtil } from '../shared/utils/address-util';
import { AddressForm } from '../address/address-form/address-form.model';
import { SelectAddressComponent } from '../address/select-address/select-address.component';
import { MatCheckbox, MatCheckboxChange } from '@angular/material/checkbox';
import { AddressService } from '../address/address.service';
import { CreateOrderRequest } from '../order/create-order-request.model';

@Component({
  selector: 'app-checkout',
  imports: [
    CartItemCardListComponent,
    CurrencyPipe,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatAnchor,
    MatStepperModule,
    AddressFormComponent,
    SelectAddressComponent,
    MatCheckbox,
  ],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
})
export class CheckoutComponent implements OnInit {
  private readonly cartItemService = inject(CartItemService);
  private readonly authService = inject(AuthService);
  private readonly orderService = inject(OrderService);
  private readonly router = inject(Router);
  private readonly messageService = inject(MessageService);
  private readonly addressService = inject(AddressService);

  readonly shippingAddress = signal<Address | null>(null);

  readonly addressForm = AddressUtil.createAddressForm();

  readonly taxAmount = 0.04;

  readonly useSavedAddressControl = new FormControl<boolean>(true);

  readonly hasAddress = signal(false);

  @ViewChild(MatStepper) stepper!: MatStepper;

  ngOnInit(): void {
    // Check if the user has any addresses at all
    this.addressService.getUserPrimaryAddress(this.authService.userId!).subscribe({
      next: () => this.hasAddress.set(true),
    });
  }

  getTotal(): number {
    const tax = this.subtotal * this.taxAmount;

    return this.subtotal + tax;
  }

  getFullName(): string {
    const address = this.shippingAddress();

    return address ? AddressUtil.fullName(address) : '';
  }

  getFullAddress(): string {
    const address = this.shippingAddress();

    return address ? AddressUtil.fullAddress(address) : '';
  }

  setAddress(form: AddressForm) {
    const address = AddressUtil.extractData(form, this.authService.userId!);

    this.shippingAddress.set(address);
    this.stepper.next();
  }

  onSavedAddressCheck(changed: MatCheckboxChange) {
    if (!changed.checked) {
      this.shippingAddress.set(null);
      this.addressForm.reset();
    }
  }

  onAddressSelected(address: Address | null) {
    if (address) {
      this.shippingAddress.set(address);

      AddressUtil.autofillForm(address, this.addressForm);
    } else {
      this.shippingAddress.set(null);
      this.addressForm.reset();
    }
  }

  placeOrder() {
    if (this.cartItems.length == 0) {
      this.messageService.error('Cannot place order (cart is empty).');
      return;
    }

    if (this.authService.isLoggedIn) {
      const orderInfo = this.getOrderInfo();

      if (this.addressForm.value!.shouldSave) {
        // Save the address for the user
        const savedAddress = this.shippingAddress()!;
        savedAddress.isPrimary = false;

        this.addressService.createAddress(savedAddress).subscribe({
          error: (err: HttpErrorResponse) => this.messageService.error(err.message),
        });
      }

      this.orderService.createOrder(orderInfo).subscribe({
        next: () => {
          this.messageService.success('You have successfully placed your order!');
          this.cartItemService.clearLocalCart();
          this.router.navigate(['/home']);
        },
        error: (err: HttpErrorResponse) => {
          switch (err.status) {
            case 403:
              this.messageService.error('Cannot place order (insufficient funds).');
              break;
            default:
              this.messageService.error(err.message);
          }
        },
      });
    }
  }

  get cartItems(): CartItem[] {
    return this.cartItemService.cartItems();
  }

  get subtotal(): number {
    return this.cartItemService.subtotal();
  }

  private getOrderInfo(): CreateOrderRequest {
    const addressInfo = this.shippingAddress()!;
    const orderInfo: CreateOrderRequest = {
      buyerId: this.authService.userId!,
      guestEmail: null, // TODO: Guest checkout
      guestSessionId: null, // TODO: Guest checkout
      totalPaid: this.getTotal(),
      shippingFirstname: addressInfo.firstName,
      shippingLastname: addressInfo.lastName,
      shippingAddress1: addressInfo.addressLine1,
      shippingAddress2: addressInfo.addressLine2 ?? null,
      shippingCity: addressInfo.city,
      shippingState: addressInfo.state,
      shippingZip: addressInfo.zip,
      shippingPhone: addressInfo.phone,
    };

    return orderInfo;
  }
}
