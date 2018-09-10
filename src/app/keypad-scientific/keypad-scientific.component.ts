import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-keypad-scientific',
  templateUrl: './keypad-scientific.component.html',
  styleUrls: ['./keypad-scientific.component.css']
})
export class KeypadScientificComponent implements OnInit {

  @Output() tecla = new EventEmitter<string>();

  Filas = [
    ['SEN', 'log', 'a', 'inv'],
    ['COS', '&Sqrt;', 'abs', 'a'],
    ['TAN', '10^x', 'a', 'a'],
    ['&pi;', 'e', 'a', 'a'],
  ];


  constructor() { }

  ngOnInit() {

  }

  getTecla(tecla: string) {
    this.tecla.emit(tecla);
  }


  clasBtn(tecla: string) {
    const btn = 'btn btn-lg btn-border ';
    if (tecla === 'inv') {
      return btn + 'btn-warning';
    }
    return btn + 'btn-info';
  }

}
