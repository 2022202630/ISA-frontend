// app.routes.ts
import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { AddMovieComponent } from './add-movie/add-movie.component';
import { MovieSearchComponent } from './movie-search/movie-search.component';
import { CartComponent } from './cart/cart.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'auth/register', component: RegistrationComponent },
  { path: 'add-movie', component: AddMovieComponent },
  { path: 'movie-search', component: MovieSearchComponent },
  { path: 'cart', component: CartComponent },
  { path: 'movie/:id', component: MovieDetailsComponent },
];
