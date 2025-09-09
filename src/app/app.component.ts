import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
    MatToolbarModule,
    MatButtonModule,
    CommonModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isLoggedIn$: Observable<boolean>;
  username: string | null = null;

  constructor(public authService: AuthService) {
    this.isLoggedIn$ = authService.isLoggedIn$;

    // Initialize username if logged in
    if (authService.hasToken()) {
      this.username = authService.getUsernameFromToken();
    }

    // Update username reactively
    this.isLoggedIn$.subscribe(logged => {
      this.username = logged ? authService.getUsernameFromToken() : null;
    });
  }

  logout() {
    this.authService.logout();
  }
}
