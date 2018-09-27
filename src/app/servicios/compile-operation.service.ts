import { Injectable } from '@angular/core';
import { FormatearCadenasService } from './formatear-cadenas.service';

const pi = Math.PI;
const e = Math.E;

@Injectable({
  providedIn: 'root'
})
export class CompileOperationService {

  constructor(public formatear: FormatearCadenasService, ) { }

  operation = '';

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

  compile(operacion: string) {
    this.operation = operacion;
    this.handleOperation();
    return this.operation;
  }

  handleOperation() {
    this.operation = this.operation.replace('√', 'SQRT');
    this.operation = this.operation.replace('pi', pi.toString());
    this.operation = this.operation.replace('e', e.toString());
    this.operation = this.porcentaje(this.operation);
    this.operation = this.formatear.addParentisis(this.operation);
  }

}
