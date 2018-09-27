import { Injectable } from '@angular/core';
import { FormatearCadenasService } from './formatear-cadenas.service';
import { isSigno, strLast, deleteLast } from '../funciones';
import { CompileOperationService } from './compile-operation.service';

const COS = x => Math.cos(x);
const SEN = x => Math.sin(x);
const TAN = x => Math.tan(x);
const SQRT = x => Math.sqrt(x);

@Injectable({
  providedIn: 'root'
})
export class ResolverOperacionService {

  constructor(
    private compileOperation: CompileOperationService
  ) { }

  // verifica que la operacion sea valida
  isValid(operacion: string) {
    // se busca si el ultimo caracter no termina con
    // un parentesis o con un signo
    if (/[\(\+\-\*\/]$/.test(operacion)) {
      return false;
    }
    // console.log(`formateando operacion = ${operacion}`)
    return true;
  }

  resolverOperacion(operacion = ''): string {

    if (!this.isValid(operacion)) {
      return '';
    }

    operacion = this.compileOperation.compile(operacion);

    let resultado: string;
    try {
      // tslint:disable-next-line:no-eval
      resultado = eval(operacion);

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
