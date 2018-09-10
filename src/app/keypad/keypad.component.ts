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
    ['%', '(', ')', '/'],
    ['7', '8', '9', '*'],
    ['4', '5', '6', '-'],
    ['1', '2', '3', '+'],
    ['0', '.', '+/-', '=']
  ];

  getTecla(tecla: string) {
    this.tecla.emit(tecla);
  }

  clasBtn(tecla: string) {
    const btn = 'btn btn-lg btn-border ';
    if (tecla === '=') {
      return btn + 'btn-success';
    }
    return btn + 'btn-info';
  }
}
