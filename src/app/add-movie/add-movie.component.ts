import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-add-movie',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule
  ],
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.css']
})
export class AddMovieComponent {
  movie = {
    name: '',
    duration: 0,
    director: '',
    genres: '',
    actors: '',
    posterUrl: ''
  };

  constructor(private http: HttpClient, private router: Router) {}

  submitMovie() {
    const payload = {
      ...this.movie,
      genres: this.movie.genres.split(',').map(g => g.trim()),
      actors: this.movie.actors.split(',').map(a => a.trim())
    };

    this.http.post('http://178.148.18.92:8080/movies', payload).subscribe({
      next: () => {
        alert('Movie added successfully!');
        this.router.navigate(['/']);
      },
      error: () => alert('Failed to add movie')
    });
  }
}
