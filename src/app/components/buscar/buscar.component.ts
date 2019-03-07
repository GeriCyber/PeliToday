import { Component, OnInit } from '@angular/core';
import { PeliculasService } from '../../services/peliculas.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})
export class BuscarComponent implements OnInit {

  buscar = '';
  loading = false;

  constructor(public ps: PeliculasService, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe(params => {
      if (params['texto']) {
        this.buscar = params['texto'];
        this.buscarPelicula();
      }
    });
   }

   ngOnInit() {
  }

  buscarPelicula() {
    if (this.buscar.length === 0) {
      return;
    }
    this.loading = true;
    this.ps.buscarPelicula(this.buscar).subscribe(data => data);
     setTimeout(() => {
      this.loading = false;
     }, 3000);
  }

}
