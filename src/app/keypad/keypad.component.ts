import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { CalcService } from '../calc.service';
import { Filas, Teclas } from '../calc-class';


@Component({
  selector: 'app-keypad',
  templateUrl: './keypad.component.html',
  styleUrls: ['./keypad.component.css']
})
export class KeypadComponent implements OnInit {

  @Output() tecla = new EventEmitter<string>();
  Filas: Filas[];

  constructor(public calcService: CalcService) { }

  ngOnInit() {
    const teclas = [
      ['√', '(', ')', '%', 'AC'],
      ['COS', '7', '8', '9', '/'],
      ['SEN', '4', '5', '6', '*'],
      ['TAN', '1', '2', '3', '-'],
      ['+/-', '0', '.', '=', '+']
    ];

    this.Filas = teclas.map(fila => new Filas(fila));
  }

  buscarTecla(_tecla: string): Teclas {
    return this.Filas.map(fila =>
      fila.Teclas.find(
        tecla => tecla.nombre === _tecla
      )
    ).find(value => value !== undefined);
  }

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
