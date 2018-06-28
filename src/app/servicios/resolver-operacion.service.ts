import { Injectable } from '@angular/core';
import { FormatearCadenasService } from './formatear-cadenas.service';
import { isSigno } from '../funciones';

@Injectable({
  providedIn: 'root'
})
export class ResolverOperacionService {

  constructor(public formatear: FormatearCadenasService) { }

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
    if (operacion.endsWith('(') || isSigno(operacion[operacion.length - 1])) {
      operacion = operacion.substr(0, operacion.length - 1);
    }

    operacion = this.formatear.parentisis(operacion);
    // console.log(`formateando operacion = ${operacion}`);
    operacion = this.porcentaje(operacion);

    let resultado: number;
    try {
      resultado = !isSigno(operacion[operacion.length - 1]) ?
        // tslint:disable-next-line:no-eval
        eval(operacion) : null;
    } catch (Error) { alert(Error); }

    return resultado;
  }
}
