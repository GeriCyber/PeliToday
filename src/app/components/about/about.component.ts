import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  loading: boolean;
  constructor() { }

  ngOnInit() {
    setTimeout(() => {
      this.loading = false;
    }, 500);
    this.loading = true;
  }

}
