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

  // 12+345+6889 = +345+
  TextCenterCursor(textCursor: TexCursor): string {
    const cadenaIzquierda = textCursor.start;
    let cadenaDerecha = textCursor.end;

    let
      textCenterLef = '',
      textCenterRigh = '';

    // 12+2|53+23 = +2
    const recortarIzquierda = (): void => {
      if (this.isSigno(cadenaIzquierda)) {
        const posicionSigno = this.posicionUltimoSigno(cadenaIzquierda);
        textCenterLef = cadenaIzquierda.substr(posicionSigno);
      } else { textCenterLef = cadenaIzquierda; }
    };

    // 12+2|53+23 = 53+
    const recortarDerecha = (): void => {
      if (this.isSigno(cadenaDerecha)) {
        const posicionSigno = this.posicionPrimerSigno(cadenaDerecha);
        textCenterRigh = cadenaDerecha.substr(0, posicionSigno);
      } else { textCenterRigh = cadenaDerecha; }
    };

    // 1+|-23+5  = -23+
    if (this.isSigno(cadenaIzquierda[cadenaIzquierda.length - 1]) && this.isSigno(cadenaDerecha[0])) {
      const primerSigno = cadenaDerecha[0];
      cadenaDerecha = cadenaDerecha.substr(1);
      recortarDerecha();
      return primerSigno + textCenterRigh;
    }

    // -1+2 = -1+
    if (cadenaIzquierda === '' && this.isSigno(cadenaDerecha[0])) {
      const primerSigno = cadenaDerecha[0];
      cadenaDerecha = cadenaDerecha.substr(1);
      recortarDerecha();
      return primerSigno + textCenterRigh;
    }

    recortarIzquierda();
    recortarDerecha();

    const textCenterCursor = textCenterLef + textCenterRigh;
    // console.log(`left =${textCenterLef} righ =${textCenterRigh}`);

    return textCenterCursor;
  }

  isSigno(searchString = ''): boolean {
    return searchString.includes('*') ||
      searchString.includes('/') ||
      searchString.includes('+') ||
      searchString.includes('-') ? true : false;
  }

  posicionUltimoSigno(text: string) {
    let posicion = -1;
    for (let i = text.length - 1; i >= 0; i--) {
      const iterator = text[i];
      if (iterator === '*' ||
        iterator === '/' ||
        iterator === '+' ||
        iterator === '-') { posicion = i; break; }
    }
    return posicion;
  }

  posicionPrimerSigno(text: string) {
    let posicion = -1;
    for (let i = 0; i < text.length; i++) {
      const iterator = text[i];
      if (iterator === '*' ||
        iterator === '/' ||
        iterator === '+' ||
        iterator === '-') { posicion = i + 1; break; }
    }
    return posicion;
  }

}
