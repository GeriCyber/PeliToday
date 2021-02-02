import { Component, OnInit, OnDestroy } from '@angular/core';
import { PeliculasService } from '../../services/peliculas.service';
import { ActivatedRoute } from '@angular/router';
import { retry } from 'rxjs/operators';
import { Movie } from '../../models/movie.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})
export class BuscarComponent implements OnInit, OnDestroy {

  buscar: string = null;
  loading = false;
  error = false;
  noMoviesMatch = false;
  movies: Movie[] = [];

  private _subscription: Subscription = new Subscription();

  constructor(private ps: PeliculasService, private activatedRoute: ActivatedRoute) {
   }

   ngOnInit() {
    this._subscription.add(
      this.activatedRoute.params.subscribe(params => {
        if (params['buscar']) {
          this.buscar = params['buscar'];
          this.buscarPelicula();
        }
      })
    );
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  buscarPelicula() {
    if (this.buscar.length === 0) {
      return;
    }

    this.loading = true;
    this._subscription.add(
      this.ps.searchMovies(this.buscar)
      .pipe(
        retry(3)
      )
      .subscribe((movies) => {
        this.movies = movies;
        if (movies.length === 0) {
          this.noMoviesMatch = true;
        } else {
          this.noMoviesMatch = false;
        }
        this.loading = false;
        this.error = false;
      },
      (error) => {
        this.loading = false;
        this.error = true;
        this.movies = [];
        console.error(error);
      })
    );
  }

}
