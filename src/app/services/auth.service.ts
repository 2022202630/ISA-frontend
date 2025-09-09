import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import * as jwt_decode from 'jwt-decode';


export interface AuthResponse {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly API_URL = 'http://178.148.18.92:8080/auth';
  private TOKEN_KEY = 'jwt_token';

  constructor(private http: HttpClient) {}

  login(credentials: { username: string; password: string }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.API_URL}/login`, credentials);
  }

  // Reactive login state
  private loggedInSubject = new BehaviorSubject<boolean>(this.hasToken());
  // ✅ Make this public
  public isLoggedIn$ = new BehaviorSubject<boolean>(this.hasToken());
  
  register(user: {
    username: string;
    password: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    address?: string;
  }): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/register`, user);
  }

  setToken(token: string) {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  hasToken(): boolean {
    return !!this.getToken();
  }

  clearToken() {
    localStorage.removeItem(this.TOKEN_KEY);
  }
  logout() {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  // Add this method
getUsernameFromToken(): string | null {
  const token = this.getToken();
  if (!token) return null;

  try {
    const decoded: any = (jwt_decode as any).default(token);
    return decoded.sub || decoded.username || null;
  } catch (e) {
    console.error('Invalid token', e);
    return null;
  }
}

}
