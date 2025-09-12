import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  movies: any[] = [];
  recommendedMovies: any[] = [];

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private movieService: MovieService
  ) {}

  ngOnInit(): void {
    this.loadNowShowing();
    this.loadRecommendedMovies();
  }

  loadNowShowing(): void {
    this.http.get<any[]>('http://178.148.18.92:8080/movies')
      .subscribe({
        next: data => {
          console.log('Movies from backend:', data);
          this.movies = data.slice(0, 7); // show only first 10 movies
        },
        error: err => console.error('Failed to load movies', err)
      });
  }

loadRecommendedMovies(): void {
  const favoriteGenres = this.authService.getFavoriteGenres?.() || [];
  
  if (favoriteGenres.length === 0) {
    console.warn('No favorite genres found, skipping recommended movies.');
    this.recommendedMovies = [];
    return;
  }

  this.movieService.getMoviesByGenres(favoriteGenres, 7)
    .subscribe({
      next: data => this.recommendedMovies = data,
      error: err => console.error('Failed to load recommended movies', err)
    });
}


  getGenreList(genres: any[]): string {
    return genres?.join(', ') || '';
  }
}
