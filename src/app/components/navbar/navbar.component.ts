import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  navbarChange: boolean;
  private _subscription: Subscription = new Subscription();

  constructor(private router: Router) {}

  ngOnInit() {
    this._subscription.add(
      this.router.events.subscribe(() => {
        if (this.router.url === '/home') {
          this.navbarChange = true;
        } else {
          this.navbarChange = false;
        }
      })
    );
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }

  buscarPelicula(search: string) {
    if (search.length === 0) {
      return;
    }
    this.router.navigate(['buscar', search]);
  }

}
