import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { PeliculasService } from 'src/app/services/peliculas.service';
import { Movie } from '../../models/movie.model';

@Component({
  selector: 'app-pelicula',
  templateUrl: './pelicula.component.html',
  styles: []
})
export class PeliculaComponent implements OnInit, OnDestroy {
  movie: Movie;
  returnTo: string;
  search: string;
  loading = true;

  private _subscription: Subscription = new Subscription();

  constructor(private ps: PeliculasService, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this._subscription.add(
      this.activatedRoute.params.subscribe(params => {
        this.returnTo = params.pag;
        if (params['busqueda']) {
          this.search = params['busqueda'];
        }

        this.ps.getMovie(Number(params['id'])).subscribe(movie => {
          this.movie = movie;
          this.loading = false;
        },
        (error) => {
          this.loading = false;
          console.error(error);
        });
      })
    );
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }

}
