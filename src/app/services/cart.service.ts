import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { AuthService } from './auth.service';

export interface CartItem {
  id: number;
  movieId: number;
  movieName?: string;
  quantity?: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private readonly API_URL = 'http://178.148.18.92:8080/cart';
  private cartItemsSubject = new BehaviorSubject<CartItem[]>([]);
  public cartItems$ = this.cartItemsSubject.asObservable();

  constructor(private http: HttpClient, private authService: AuthService) {}

  loadCart(): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(`${this.API_URL}/all`).pipe(
      tap(items => this.cartItemsSubject.next(items))
    );
  }

  addToCart(movieId: number): Observable<CartItem> {
    return this.http.post<CartItem>(`${this.API_URL}/add`, { movieId }).pipe(
      tap(() => this.loadCart().subscribe()) // refresh BehaviorSubject
    );
  }

  removeFromCart(movieId: number): Observable<void> {
    return this.http.request<void>('delete', `${this.API_URL}/remove`, { body: { movieId } }).pipe(
      tap(() => this.loadCart().subscribe())
    );
  }

  clearCart(): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/clear`).pipe(
      tap(() => this.loadCart().subscribe())
    );
  }

  checkout(): Observable<void> {
    return this.http.post<void>(`${this.API_URL}/checkout`, {}).pipe(
      tap(() => this.loadCart().subscribe())
    );
  }
}
