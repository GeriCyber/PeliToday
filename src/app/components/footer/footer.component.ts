import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  fixedFooter: boolean;

  constructor(private router: Router) {
    this.router.events.subscribe((url: any) => {
      if (this.router.url === '/buscar') {
        this.fixedFooter = true;
      } else {
        this.fixedFooter = false;
      }
    });
  }

  ngOnInit() {
  }

}
