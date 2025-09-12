import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MovieService } from '../services/movie.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CartService } from '../services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-movie-search',
  standalone: true,
  templateUrl: './movie-search.component.html',
  styleUrls: ['./movie-search.component.css'],
  imports: [ReactiveFormsModule, CommonModule]
})
export class MovieSearchComponent {
  searchForm: FormGroup;
  movies: any[] = [];
  error: string | null = null;
  isLoading = false;

  constructor(
  private fb: FormBuilder,
  private movieService: MovieService,
  private cartService: CartService,
  private authService: AuthService,
  private toastr: ToastrService
  ) {
    this.searchForm = this.fb.group({
      title: [''],
      director: [''],
      genre: ['']
    });
  }

  ngOnInit(): void {
    // Load all movies initially
    this.loadMovies();

    // Live search
    this.searchForm.valueChanges.subscribe(() => {
      this.loadMovies();
    });
  }

  loadMovies(): void {
    this.isLoading = true;
    const { title, director, genre } = this.searchForm.value;

    this.movieService.searchMovies(title, director, genre).subscribe({
      next: (data: any[]) => {
        this.movies = data.map(movie => ({
          ...movie,
          screeningTime: this.getRandomScreeningTime(),
          director: movie.director?.name || 'Unknown',
          genres: movie.genres?.map((g: any) => g.name).join(', ') || 'N/A',
          actors: movie.actors?.map((a: any) => a.name).join(', ') || 'N/A'
        }));
        this.isLoading = false;
      },
      error: () => {
        this.error = 'Failed to fetch movies';
        this.isLoading = false;
      }
    });
  }

    isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  deleteMovie(id: number) {
    this.movieService.deleteMovie(id).subscribe(() => {
      this.movies = this.movies.filter(m => m.id !== id);
      this.toastr.success('Movie deleted successfully!');
    });
  }
  addToCart(movieId: number): void {
    if (!this.authService.getToken()) {
      this.toastr.error('Please log in first');
      return;
    }

    this.cartService.addToCart(movieId).subscribe({
      next: () => this.toastr.success('Movie added to cart!'),
      error: () => this.toastr.error('Failed to add to cart')
    });
  }

  
  private getRandomScreeningTime(): string {
    const hour = Math.floor(Math.random() * 12) + 10; // 10AM - 9PM
    const minutes = Math.random() < 0.5 ? '00' : '30';
    return `${hour}:${minutes}`;
  }
}
