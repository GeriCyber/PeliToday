import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { PeliculasService } from '../../services/peliculas.service';
import { Movie } from '../../models/movie.model';
import { retry, switchMap } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  @ViewChild('cartelera', { read: ElementRef })
  cartelera: ElementRef;
  nowPlayingMovies: Movie[] = [];
  popularMovies: Movie[] = [];
  kids: Movie[] = [];
  pathImg: string;
  url = 'http://image.tmdb.org/t/p/w500/';
  loading = false;

  private _subscription: Subscription = new Subscription();

  constructor(private ps: PeliculasService) {}

  ngOnInit() {

    this.loading = true;

    this._subscription.add(
      this.ps.getNowPlayingMovies()
      .pipe(
        retry(3),
        switchMap((nowPlayingMovies) => {
          this.nowPlayingMovies = nowPlayingMovies;
          return this.ps.getPopularMovies();
        }),
        switchMap((popularMovies) => {
          this.popularMovies = popularMovies;
          this.pathImg = `${this.url}${this.popularMovies[0].backdrop_path}`;
          return this.ps.getPopularKidsMovies();
        }),
      )
      .subscribe(kidsMovies => {
        this.kids = kidsMovies;
        this.loading = false;
      },
      (error) => {
        this.loading = false;
        console.error(error);
      })
    );
  }

  goToCartelera() {
    this.cartelera.nativeElement.scrollIntoView({
      behavior: 'smooth',
    });
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }
}
