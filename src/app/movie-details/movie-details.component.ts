import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../services/movie.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {
  Math = Math; 
  movie: any = null;
  averageRating: number = 4.2; 
  rating: number = 5;
  comments: any[] = [
    { name: 'RandomUser1', text: 'Great movie!', date: '2025-10-01' },
    { name: 'RandomUser2', text: 'Loved it!', date: '2025-10-02' }
  ];
  newComment: string = '';
  thankYouMessage: string = '';

  constructor(private route: ActivatedRoute, private movieService: MovieService, private authService: AuthService) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.movieService.getMovieById(+id).subscribe({
        next: data => this.movie = data,
        error: err => console.error('Failed to load movie', err)
      });
    }
  }

  getGenreList(genres: any[]): string {
    return genres?.map(g => g.name || g).join(', ') || 'N/A';
  }

  submitRating(): void {
    this.averageRating = (this.averageRating + this.rating) / 2;
    this.rating = 5;
  }

  postComment(): void {
    if (!this.newComment.trim()) return;
    this.comments.push({
      name: this.authService.getUsernameFromToken() || 'Anonymous',
      text: this.newComment,
      date: new Date().toISOString().split('T')[0]
    });
    this.newComment = '';
    this.thankYouMessage = 'Thank you for your comment!';
    setTimeout(() => this.thankYouMessage = '', 3000);
  }
}
