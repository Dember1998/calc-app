import { Injectable } from '@angular/core';
import { FormatearCadenasService } from './formatear-cadenas.service';

const pi = Math.PI.toString();
const e = Math.E.toString();

@Injectable({
  providedIn: 'root'
})
export class CompileOperationService {

  constructor(public formatear: FormatearCadenasService, ) { }

  op = '';

  /**busca todas las apariciones de % y las reemplaza con /100 */
  porcentaje(operacion: string) {
    if (!operacion.includes('%')) { return operacion; }

    let newString = '';
    for (const iterator of operacion) {
      switch (iterator) {
        case '%': newString += '/100'; break;
        default: newString += iterator; break;
      }
    }
    return newString;
  }

  compile(operacion: string) {
    this.op = operacion;
    this.handleOperation();
    return this.op;
  }

  handleOperation() {
    if (this.op.includes('\u221A')) {
      this.op = this.op.replace(/\u221A/g, 'SQRT');
    }

    if (this.op.includes('pi') || this.op.includes('e')) {
      this.op = this.op.replace(/pi|e/g, (x) => x === 'e' ? e : pi);
    }

    this.op = this.porcentaje(this.op);
    this.op = this.handleParentesis(this.op);
  }

  /** convierte 1(2  a 1*(2) */
  handleParentesis(op: string) {
    if (op.includes('(') || op.includes(')')) {
      op = this.formatear.addParentisis(op);
      op = this.NumberAndParentesis(op);
      op = this.ParentesisAndNumber(op);
      op = this.ParentesisAndParentesis(op);
    }
    return op;
  }

  /** convierte 1(2) a 1*(2) */
  NumberAndParentesis(op: string) {
    return op.replace(/(\d)(?=\()/g, '$1*');
  }

  /** convierte 1*(2)3 a 1*(2)*3 */
  ParentesisAndNumber(op: string) {
    return op.replace(/\)(\d)/g, ')*$1');
  }

  /** convierte 1*(2)*(3) */
  ParentesisAndParentesis(op: string) {
    return op.replace(/\)\(/g, ')*(');
  }

}
