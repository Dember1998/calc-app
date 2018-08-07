import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-keypad',
  templateUrl: './keypad.component.html',
  styleUrls: ['./keypad.component.css']
})
export class KeypadComponent {

  @Output() tecla = new EventEmitter<string>();

  constructor() { }

  Filas = [
    ['pi', 'e', '10x', 'xy', 'log'],
    ['√', '(', ')', '%', 'AC'],
    ['COS', '7', '8', '9', '/'],
    ['SEN', '4', '5', '6', '*'],
    ['TAN', '1', '2', '3', '-'],
    ['+/-', '0', '.', '=', '+']
  ];

  getTecla(tecla: string) {
    this.tecla.emit(tecla);
  }

  clasBtn(tecla: string) {
    if (tecla >= '0' && tecla <= '9') {
      return 'btn-secondary';
    } else {
      return 'btn-dark';
    }
  }
}
