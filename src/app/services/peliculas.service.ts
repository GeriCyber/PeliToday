import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Movie, MovieResponse } from '../models/movie.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {

  private apiKey = 'bf42e2ed4ab36e636cf3939ca4d75482';
  private urlMovieDB = 'https://api.themoviedb.org/3';

  constructor(private http: HttpClient) { }

  /**
   * Obtiene las peliculas populares
   *
   * @returns {Observable<Movie[]>}
   * @memberof PeliculasService
   */
  getPopularMovies(): Observable<Movie[]> {
    const url = `${this.urlMovieDB}/movie/popular?api_key=${this.apiKey}&language=es-ES&page=1`;
    return this.http.get(url).pipe(map( (response: MovieResponse) => response.results));
  }

  /**
   * Obtiene las peliculas populares para niños
   *
   * @returns {Observable<Movie[]>}
   * @memberof PeliculasService
   */
  getPopularKidsMovies(): Observable<Movie[]> {
    const url = `${this.urlMovieDB}/discover/movie?certification_country=US&certification.lte=G&sort_by=popularity.desc&api_key=${this.apiKey}&language=es&callback=JSONP_CALLBACK`;
    return this.http.jsonp(url, '').pipe(map( (response: MovieResponse) => response.results));
  }

  /**
   * Obtiene las peliculas en cartelera
   *
   * @returns {Observable<Movie[]>}
   * @memberof PeliculasService
   */
  getNowPlayingMovies(): Observable<Movie[]> {
    const url = `${this.urlMovieDB}/movie/now_playing?api_key=${this.apiKey}&language=es-ES&page=1`;
    return this.http.get(url).pipe(map((response: MovieResponse) => response.results));
  }

  /**
   * Buscar peliculas
   *
   * @param {string} search
   * @returns {Observable<Movie[]>}
   * @memberof PeliculasService
   */
  searchMovies(search: string): Observable<Movie[]> {
     const url = `${this.urlMovieDB}/search/movie?query=${search}&sort_by=popularity.desc&api_key=${this.apiKey}&language=es&callback=JSONP_CALLBACK`;
     return this.http.jsonp(url, '').pipe(map((response: MovieResponse) => response.results));
  }

  /**
   * Obtiene una pelicula por id
   *
   * @param {number} id
   * @returns {Observable<Movie>}
   * @memberof PeliculasService
   */
  getMovie(id: number): Observable<Movie> {
    const url = `${this.urlMovieDB}/movie/${id}?api_key=${this.apiKey}&language=es&callback=JSONP_CALLBACK`;
    return this.http.jsonp(url, '').pipe(map((response: Movie) => response));
  }
}
