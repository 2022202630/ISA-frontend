import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { jwtDecode } from 'jwt-decode';
export interface AuthResponse {
  token: string;
}

export interface JwtPayload {
  sub?: string;
  username?: string;
  userId?: number; 
  roles?: string[];
  exp?: number;
  iat?: number;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly API_URL = 'http://178.148.18.92:8080/auth';
  private TOKEN_KEY = 'jwt_token';

  private loggedInSubject = new BehaviorSubject<boolean>(this.hasToken());
  public isLoggedIn$ = this.loggedInSubject.asObservable();

  constructor(private http: HttpClient) {}
login(credentials: { username: string; password: string }): Observable<AuthResponse> {
  return this.http.post<AuthResponse>(`${this.API_URL}/login`, credentials, {
    responseType: 'json' 
  });
}

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
    this.loggedInSubject.next(false);
  }

  logout() {
    this.clearToken();
  }

  getUsernameFromToken(): string | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const decoded: JwtPayload = jwtDecode(token);
      return decoded.sub || decoded.username || null;
    } catch (e) {
      console.error('Invalid token', e);
      return null;
    }
  }

  getUserIdFromToken(): number | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const decoded: JwtPayload = jwtDecode(token);
      return decoded.userId || null;
    } catch (e) {
      console.error('Invalid token', e);
      return null;
    }
  }
getRolesFromToken(): string[] {
  const token = this.getToken();
  if (!token) return [];

  try {
    const decoded: JwtPayload = jwtDecode(token);
    return decoded.roles || [];
  } catch (e) {
    console.error('Invalid token', e);
    return [];
  }
}

isAdmin(): boolean {
  const roles = this.getRolesFromToken();
  return roles.includes('ADMIN');
}
getFavoriteGenres(): string[] {
  const token = this.getToken();
  if (!token) return [];

  try {
    const decoded: any = jwtDecode(token); 
    return decoded.favoriteGenres || [];
  } catch (e) {
    console.error('Invalid token', e);
    return [];
  }
}

}
