import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { CartItemService } from '../cart/cart-item.service';
import { AuthService } from '../auth/auth.service';
import { CartItem } from '../cart/cart-item.model';
import { HttpErrorResponse } from '@angular/common/http';
import { CartItemCardListComponent } from '../cart/cart-item-card-list/cart-item-card-list';
import { MatCard, MatCardContent } from '@angular/material/card';
import { CurrencyPipe } from '@angular/common';
import { MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { COUNTRIES } from './countries';
import { MatSelectModule } from '@angular/material/select';
import { US_STATES } from './us-states';
import { MatAnchor } from '@angular/material/button';
import { MatStepperModule } from '@angular/material/stepper';
import { OrderService } from '../order/order.service';
import { Order, OrderStatus } from '../order/order.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  imports: [
    CartItemCardListComponent,
    CurrencyPipe,
    MatFormField,
    MatLabel,
    MatInput,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatAnchor,
    MatStepperModule,
  ],
  templateUrl: './checkout.html',
  styleUrl: './checkout.scss',
})
export class CheckoutComponent implements OnInit {
  private cartItemService = inject(CartItemService);
  private authService = inject(AuthService);
  private orderService = inject(OrderService);
  private router = inject(Router);

  cartItems = signal<CartItem[] | null>(null);

  countries = COUNTRIES;
  states = US_STATES;

  readonly taxAmount = 0.04;

  readonly subTotal = computed(() =>
    // Dynamically calculates the cart total as items are retrieved
    this.cartItems()?.reduce((sum, item) => sum + item.itemListing.price * item.quantity, 0),
  );

  shippingForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    address1: new FormControl('', Validators.required),
    address2: new FormControl(''),
    city: new FormControl('', Validators.required),
    state: new FormControl(''),
    zip: new FormControl('', [Validators.required, Validators.pattern('[0-9]+')]),
    phone: new FormControl('', Validators.required),
  });

  ngOnInit(): void {
    this.cartItemService.getCartItemsByUserId(this.authService.userId!!).subscribe({
      next: (items) => this.cartItems.set(items),
      error: (err: HttpErrorResponse) => alert(err.message),
    });
  }

  getTotal(): number {
    const tax = (this.subTotal() ?? 0) * this.taxAmount;

    return (this.subTotal() ?? 0) + tax;
  }

  getFullName(): string {
    const formValues = this.shippingForm.value!;
    return formValues.firstName + ' ' + formValues.lastName;
  }

  getFullAddress(): string {
    const formValues = this.shippingForm.value!;

    let addressPt2: string;
    if (formValues.address2) {
      addressPt2 = ' ' + formValues.address2;
    } else {
      addressPt2 = '';
    }

    return (
      formValues.address1 +
      addressPt2 +
      ', ' +
      formValues.city +
      ', ' +
      formValues.state +
      ' ' +
      formValues.zip
    );
  }

  placeOrder() {
    const currentItems = this.cartItems();

    if (currentItems == null || currentItems.length == 0) {
      alert('Error: Cannot place order (cart is empty).');
      return;
    }

    if (this.shippingForm.valid && this.authService.isLoggedIn) {
      const formValues = this.shippingForm.value!;
      const orderInfo: Order = {
        buyerId: this.authService.userId!,
        status: OrderStatus.PENDING,
        totalPaid: this.getTotal(),
        shippingFirstname: formValues.firstName!,
        shippingLastname: formValues.lastName!,
        shippingAddress1: formValues.address1!,
        shippingAddress2: formValues.address2,
        shippingCity: formValues.city!,
        shippingState: formValues.state!,
        shippingZip: formValues.zip!,
        shippingPhone: formValues.phone!,
      };

      this.orderService.createOrder(orderInfo).subscribe({
        next: (orderWithItems) => {
          alert(`You have successfully placed your order! Ref ID: ${orderWithItems.order.orderId}`);
          this.router.navigate(['/home']);
        },
        error: (err: HttpErrorResponse) => {
          switch (err.status) {
            case 403:
              alert('Error: Cannot place order (insufficient funds).');
              break;
            default:
              alert(err.message);
          }
        },
      });
    }
  }
}
