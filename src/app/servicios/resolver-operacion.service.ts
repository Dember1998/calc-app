import { Injectable } from '@angular/core';
import { FormatearCadenasService } from './formatear-cadenas.service';
import { isSigno, strLast } from '../funciones';

@Injectable({
  providedIn: 'root'
})
export class ResolverOperacionService {

  constructor(public formatear: FormatearCadenasService) { }

  /**busca todas las apariciones de % y las reemplaza con /100 */
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

  resolverOperacion(operacion = ''): string {

    const COS = x => Math.cos(x);
    const SEN = x => Math.sin(x);
    const TAN = x => Math.tan(x);
    const SQRT = x => Math.sqrt(x);
    const pi = Math.PI;
    const e = Math.E;

    operacion = operacion.replace('√', 'SQRT');
    operacion = operacion.replace('pi', pi.toString());
    operacion = operacion.replace('e', e.toString());

    // se busca si el ultimo caracter no termina con
    // un parentesis o con un signo
    if (operacion.endsWith('(') || strLast(operacion)) {
      operacion = operacion.substr(0, operacion.length - 1);
    }

    operacion = this.formatear.parentisis(operacion);
    // console.log(`formateando operacion = ${operacion}`);
    operacion = this.porcentaje(operacion);

    let resultado: string;
    try {
      resultado = !isSigno(operacion[operacion.length - 1]) ?
        // tslint:disable-next-line:no-eval
        eval(operacion) : null;

      if (Number.isNaN(+resultado)) {
        resultado = '';
      }
    } catch (Error) {
      console.log('se detecto un error: ', Error);
      resultado = 'ERROR';
    }

    return resultado;
  }
}
