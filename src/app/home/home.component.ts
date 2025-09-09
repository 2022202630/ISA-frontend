import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  movies: any[] = [];

  constructor(private http: HttpClient) {}
  getGenreList(genres: any[]): string {
  return genres?.join(', ') || '';
}

  ngOnInit(): void {
    this.http.get<any[]>('http://178.148.18.92:8080/movies')
      .subscribe({
        next: data => {
          console.log('Movies from backend:', data); // <--- Here
          this.movies = data;
        },
        error: err => console.error('Failed to load movies', err)
      });
  }
}
