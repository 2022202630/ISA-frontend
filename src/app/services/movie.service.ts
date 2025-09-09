import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movie } from '../models/movie.model';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private apiUrl = 'http://178.148.18.92:8080/movies';

  constructor(private http: HttpClient) {}
  
  getAllMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(this.apiUrl);
  }
  searchMovies(title?: string, director?: string, genre?: string): Observable<any[]> {
    let params = new HttpParams();

    if (title && title.trim() !== '') {
      params = params.set('title', title);
    }
    if (director && director.trim() !== '') {
      params = params.set('director', director);
    }
    if (genre && genre.trim() !== '') {
      params = params.set('genre', genre);
    }

    return this.http.get<any[]>(`${this.apiUrl}/search`, { params });
  }
    deleteMovie(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  updateMovie(id: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, data);}
}
