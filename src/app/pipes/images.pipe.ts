import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'images'
})
export class ImagesPipe implements PipeTransform {

  transform(movie: any, poster: boolean = false): any {
    const url = 'http://image.tmdb.org/t/p/w500/';
    if (poster) {
      return `${url}${movie.poster_path}`;
    }
    if (movie && movie.poster_path) {
      return `${url}${movie.poster_path}`;
    } else if (movie && movie.backdrop_path) {
      return  `${url}${movie.backdrop_path}`;
    } else {
      return './assets/no-image.png';
    }
  }

}
