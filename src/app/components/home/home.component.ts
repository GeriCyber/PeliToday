import { Component, OnInit } from '@angular/core';
import { PeliculasService } from '../../services/peliculas.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  cartelera: any;
  populares: any;
  kids: any;
  pathImg: string;
  url = 'http://image.tmdb.org/t/p/w500/';
  loading: boolean;

  constructor(public ps: PeliculasService) {
  }

  ngOnInit() {

    this.loading = true;

    this.ps.getCartelera().subscribe(data => {
      this.cartelera = data.results;
    });

    this.ps.getPopulares().subscribe(data => {
      this.populares = data.results;
      this.pathImg = this.url + this.populares[0].backdrop_path;
    });

    this.ps.getKidsPopulares().subscribe(data => {
      this.kids = data.results;
    });

    setTimeout(() => {
      this.loading = false;
     }, 500);
  }

}
