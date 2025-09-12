import { Component } from '@angular/core';
import { CartService, CartItem } from '../services/cart.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  imports: [CommonModule]
})
export class CartComponent {
  cartItems: CartItem[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.cartItems$.subscribe(items => this.cartItems = items);
    this.cartService.loadCart();
  }

  removeItem(movieId: number) {
    this.cartService.removeFromCart(movieId).subscribe();
  }

  clearCart() {
    this.cartService.clearCart().subscribe();
  }

  checkout() {
    this.cartService.checkout().subscribe(() => alert('Checkout successful!'));
  }
}
