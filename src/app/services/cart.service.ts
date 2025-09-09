import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface CartItem {
  id: number;
  movie: any;
  screeningTime: string;
  reserved: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private readonly API_URL = 'http://178.148.18.92:8080/cart';

  constructor(private http: HttpClient) {}

  addToCart(movieId: number, userId: number): Observable<CartItem> {
    return this.http.post<CartItem>(`${this.API_URL}/add/${movieId}/${userId}`, {});
  }

  getCart(userId: number): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(`${this.API_URL}/${userId}`);
  }

  getReservations(userId: number): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(`${this.API_URL}/reservations/${userId}`);
  }

  checkout(userId: number): Observable<void> {
    return this.http.post<void>(`${this.API_URL}/checkout/${userId}`, {});
  }

  remove(cartId: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/remove/${cartId}`);
  }
}
