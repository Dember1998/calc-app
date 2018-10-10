import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
  <app-nav></app-nav>
  <router-outlet></router-outlet>
  `
})
export class AppComponent implements OnInit {

  constructor() { }

  ngOnInit() {

  }

}
