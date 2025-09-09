import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MovieService } from '../services/movie.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-movie-search',
  templateUrl: './movie-search.component.html',
  styleUrls: ['./movie-search.component.css'],
  imports: [ReactiveFormsModule, CommonModule]
})
export class MovieSearchComponent {
  searchForm: FormGroup;
  movies: any[] = [];
  error: string | null = null;
  isLoading = false;

  
constructor(private fb: FormBuilder, private movieService: MovieService, private cartService: CartService) {
    this.searchForm = this.fb.group({
      title: [''],
      director: [''],
      genre: ['']
    });
  }

  ngOnInit(): void {
    // Load all movies immediately
    this.loadMovies();

    // Optional: live search as you type
    this.searchForm.valueChanges.subscribe(() => {
      this.loadMovies();
    });
  }

  loadMovies(): void {
    this.isLoading = true;
    const { title, director, genre } = this.searchForm.value;
    this.movieService.searchMovies(title, director, genre).subscribe({
      next: (movies: any[]) => {
        // Add random dummy screening times
this.movieService.searchMovies(title, director, genre).subscribe({
  next: data => {
    // Map director, genres, actors to strings
    this.movies = data.map(movie => ({
      ...movie,
      
          screeningTime: this.getRandomScreeningTime(),
      director: movie.director?.name || 'Unknown',
      genres: movie.genres?.map((g: any) => g.name) || [],
      actors: movie.actors?.map((a: any) => a.name) || []
    }));
    this.isLoading = false;
  },
  error: () => {
    this.error = 'Failed to fetch movies';
    this.isLoading = false;
  }
});
      }
    });
  }

  deleteMovie(id: number) {
    this.movieService.deleteMovie(id).subscribe(() => {
      this.movies = this.movies.filter(m => m.id !== id);
    });
  }

  getRandomScreeningTime(): string {
    const hour = Math.floor(Math.random() * 12) + 10; // 10AM - 9PM
    const minutes = Math.random() < 0.5 ? '00' : '30'; 
    return `${hour}:${minutes }`;
  }
addToCart(movie: any) {
  const userId = Number(localStorage.getItem('userId')); // or get it from your AuthService
  if (!userId) {
    console.error('No logged-in user found!');
    return;
  }

  this.cartService.addToCart(movie.id, userId).subscribe({
    next: (res) => {
      console.log('Added to cart', res);
    },
    error: (err) => {
      console.error('Failed to add to cart', err);
    }
  });
}

}
