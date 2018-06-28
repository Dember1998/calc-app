import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Teclas, TexCursor } from './calc-class';
import { FormatearCadenasService } from './formatear-cadenas.service';

@Injectable({
  providedIn: 'root'
})
export class CalcService {

  constructor(public formatear: FormatearCadenasService) { }

  private textCalc$ = new Subject<string>();
  private posicionCursor$ = new Subject<number>();
  tecla$ = new Subject<Teclas>();

  // obtienen y envian las posiciones del cursor
  // provenientes de directivas
  getPosicionCursor$(): Observable<number> {
    return this.posicionCursor$.asObservable();
  }

  setPosicionCursor(posicionCursor: number, llamada = 'no indicado') {
    this.posicionCursor$.next(posicionCursor);
    // console.log(`cursorService =${posicionCursor} de ${llamada}`);

  }

  porcentaje(operacion: string) {
    let newString = '';
    for (const iterator of operacion) {
      switch (iterator) {
        case '%': newString += '/100'; break;
        default: newString += iterator; break;
      }
    }
    return newString;
  }

  resolverOperacion(operacion: string): number {
    const COS = x => Math.cos(x);
    const SEN = x => Math.sin(x);
    const TAN = x => Math.tan(x);
    const SQRT = x => Math.sqrt(x);

    // se busca si el ultimo caracter no termina con un signo
    if (operacion.endsWith('(') || this.isSigno(operacion[operacion.length - 1])) {
      operacion = operacion.substr(0, operacion.length - 1);
    }

    operacion = this.formatear.parentisis(operacion);
    // console.log(`formateando operacion = ${operacion}`);
    operacion = this.porcentaje(operacion);

    let resultado: number;
    try {
      resultado = !this.isSigno(operacion[operacion.length - 1]) ?
        // tslint:disable-next-line:no-eval
        eval(operacion) : null;
    } catch (Error) { alert(Error); }

    return resultado;
  }

  isSigno(searchString = ''): boolean {
    return searchString.includes('*') ||
      searchString.includes('/') ||
      searchString.includes('+') ||
      searchString.includes('-') ? true : false;
  }

}
