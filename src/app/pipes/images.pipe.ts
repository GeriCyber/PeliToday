import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'images'
})
export class ImagesPipe implements PipeTransform {

  transform(pelicula: any, poster: boolean = false): any {
    const url = 'http://image.tmdb.org/t/p/w500/';
    if (poster) {
      return url + pelicula.poster_path;
    }
    if (pelicula.poster_path) {
      return url + pelicula.poster_path;
    } else if (pelicula.backdrop_path) {
      return url + pelicula.backdrop_path;
    } else {
      return './assets/no-image.png';
    }
  }

}
