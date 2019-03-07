import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PeliculaComponent } from './components/pelicula/pelicula.component';
import { BuscarComponent } from './components/buscar/buscar.component';
import { AboutComponent } from './components/about/about.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'buscar', component: BuscarComponent},
  {path: 'about', component: AboutComponent},
  {path: 'buscar/:texto', component: BuscarComponent},
  {path: 'pelicula/:id/:pag', component: PeliculaComponent},
  {path: 'pelicula/:id/:pag/:busqueda', component: PeliculaComponent},
  {path: '**', pathMatch: 'full', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
