import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  navbarChange: boolean;

  constructor(private router: Router) {
    this.router.events.subscribe((url: any) => {
      if (this.router.url === '/home') {
        this.navbarChange = true;
      } else {
        this.navbarChange = false;
      }
    });
  }

  ngOnInit() {
  }

  buscarPelicula(text: string) {
    if (text.length === 0) {
      return;
    }
    this.router.navigate(['buscar', text]);
  }

}
