import { Component, OnInit } from '@angular/core';
import { CartService, CartItem } from '../services/cart.service';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  imports: [ CommonModule ]
})
export class CartComponent implements OnInit {
  cart: CartItem[] = [];
  reservations: CartItem[] = [];
  userId: number;

  constructor(
    private cartService: CartService,
    private authService: AuthService
  ) {
    this.userId = Number(localStorage.getItem('userId')); // adjust depending how you store it
  }

  ngOnInit() {
    this.loadCart();
    this.loadReservations();
  }

  loadCart() {
    this.cartService.getCart(this.userId).subscribe((res) => (this.cart = res));
  }

  loadReservations() {
    this.cartService
      .getReservations(this.userId)
      .subscribe((res) => (this.reservations = res));
  }

  checkout() {
    this.cartService.checkout(this.userId).subscribe(() => {
      this.loadCart();
      this.loadReservations();
    });
  }

  remove(cartId: number) {
    this.cartService.remove(cartId).subscribe(() => {
      this.loadCart();
    });
  }
}
