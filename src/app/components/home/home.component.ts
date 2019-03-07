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

  constructor(public ps: PeliculasService) {
  }

  ngOnInit() {

    this.ps.getCartelera().subscribe(data => {
      this.cartelera = data.results;
    });

    this.ps.getPopulares().subscribe(data => {
      this.populares = data.results;
    });

    this.ps.getKidsPopulares().subscribe(data => {
      this.kids = data.results;
    });
  }

}
