import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {

  private apiKey = 'bf42e2ed4ab36e636cf3939ca4d75482';
  private urlMoviedb = 'https://api.themoviedb.org/3';

  peliculas: any[] = [];

  constructor(private http: HttpClient) { }

  getPopulares() {
    const url = `${this.urlMoviedb}/discover/movie?sort_by=popularity.desc&api_key=${this.apiKey}&language=es&callback=JSONP_CALLBACK`;
    return this.http.jsonp(url, '').pipe(map( (res: any) => res));
  }

  getKidsPopulares() {
    // tslint:disable-next-line:max-line-length
    const url = `${this.urlMoviedb}/discover/movie?certification_country=US&certification.lte=G&sort_by=popularity.desc&api_key=${this.apiKey}&language=es&callback=JSONP_CALLBACK`;
    return this.http.jsonp(url, '').pipe(map( (res: any) => res));
  }

  getCartelera() {
    const desde = new Date();
    const hasta = new Date();

    const beginReleaseDate = `${desde.getFullYear()}-${desde.getMonth() + 1}-${desde.getDate()}`;
    const endReleaseDate = `${hasta.getFullYear()}-${hasta.getMonth() + 2}-${hasta.getDate()}`;

    // tslint:disable-next-line:max-line-length
    const url = `${this.urlMoviedb}/discover/movie?primary_release_date.gte=${beginReleaseDate}&primary_release_date.lte=${endReleaseDate}&api_key=${this.apiKey}&language=es&callback=JSONP_CALLBACK`;

    return this.http.jsonp(url, '').pipe(map( (res: any) => res));
  }

  buscarPelicula(texto: string) {
     // tslint:disable-next-line:max-line-length
     const url = `${this.urlMoviedb}/search/movie?query=${texto}&sort_by=popularity.desc&api_key=${this.apiKey}&language=es&callback=JSONP_CALLBACK`;
     return this.http.jsonp(url, '').pipe(map( (res: any) => {
       this.peliculas = res.results;
     }));
  }

  getPelicula(id: string) {
    const url = `${this.urlMoviedb}/movie/${id}?api_key=${this.apiKey}&language=es&callback=JSONP_CALLBACK`;
    return this.http.jsonp(url, '').pipe(map( (res: any) => res));
  }
}
