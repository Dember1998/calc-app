import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  template: `
  <ul class="nav nav-tabs justify-content-center">
      <li class="nav-item">
        <a class="nav-link"routerLink="/calc" routerLinkActive="active">calc</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" routerLink="/setting" routerLinkActive="active">setting</a>
      </li>
  </ul>
  `,
  styles: []
})
export class AppNavComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
