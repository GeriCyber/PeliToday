import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PeliculasService } from 'src/app/services/peliculas.service';

@Component({
  selector: 'app-pelicula',
  templateUrl: './pelicula.component.html',
  styles: []
})
export class PeliculaComponent implements OnInit {
  pelicula: any;
  returnTo = '';
  busqueda = '';

  constructor(public ps: PeliculasService, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe(params => {
      this.returnTo = params.pag;
      if (params['busqueda']) {
        this.busqueda = params['busqueda'];
      }
        this.ps.getPelicula(params['id']).subscribe(movie => {
          this.pelicula = movie;
        });
    });
   }

  ngOnInit() {
  }

}
