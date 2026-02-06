import { Component, OnInit } from '@angular/core';
import { CartItemService } from '../../cart/cart-item.service';
import { CartItem } from '../../cart/cart-item.model';
import { AuthService } from '../../auth/auth.service';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import {
  MatCard,
  MatCardHeader,
  MatCardTitle,
  MatCardSubtitle,
  MatCardContent,
} from '@angular/material/card';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-cart-dialog',
  imports: [
    MatListModule,
    MatDividerModule,
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardSubtitle,
    MatCardContent,
  ],
  templateUrl: './cart-dialog.html',
  styleUrl: './cart-dialog.scss',
})
export class CartDialogComponent implements OnInit {
  cartItems: CartItem[] = [];

  constructor(
    private cartService: CartItemService,
    private authService: AuthService,
    private dialogRef: MatDialogRef<CartDialogComponent>,
  ) {}

  ngOnInit(): void {
    this.dialogRef.afterOpened().subscribe(() => {
      if (this.authService.userId == null) {
        alert('You must be logged in to view this cart!');
        return;
      }

      console.log('Cart items are ' + this.cartItems.toString());

      this.cartService.getCartItemsByUserId(this.authService.userId).subscribe({
        next: (items) => (this.cartItems = items),
        error: (_) => alert('Could not fetch cart items!'),
      });
    });
  }
}
