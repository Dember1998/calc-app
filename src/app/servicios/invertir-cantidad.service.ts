import { Injectable } from '@angular/core';
import { isSigno } from '../funciones';
import { CalcService } from './calc.service';
import { TextCenterService, ITexCenter } from './text-center.service';
import { TexCursor } from '../calc-class';
import { TextCursorService } from './text-cursor.service';
import { EliminarSignoDerecha, EliminarSignoIzquieda } from './eliminarSigno';

@Injectable({
  providedIn: 'root'
})
export class InvertirCantidadService {

  calcText = '';
  textCursor: TexCursor;
  cantidadActual: ITexCenter;

  constructor(
    public calcService: CalcService,
    private textCenterService: TextCenterService,
    private textCursorService: TextCursorService
  ) {

    this.calcService
      .getCalcText$()
      .subscribe(text => this.calcText = text);

      this.textCenterService
      .getTextCenter$()
      .subscribe(text => this.cantidadActual = text);

    this.textCursorService
      .getTextCursor$()
      .subscribe(textCursor => this.textCursor = textCursor);
  }

  // convierte positivo a negativo y biseversa la cantidad actual
  invertir(): string {
    // no llamar a invertir  cuando la cadena actual es un signo
    if (this.isLastSigno()) {
      return this.textCursor.start + this.textCursor.end;
    }

    const cantidad: string = this.multiplicarPorMenosUno(this.cantidadActual.center);
    const newStr = this.ReemplazarEnCalcTxt(cantidad);
    return newStr;
  }

  /**verifica que el cursor se encuentra a la par de un signo */
  isLastSigno(): boolean {
    const length: number = this.cantidadActual.center.length;
    const lastChartxt: string = this.cantidadActual.center.charAt(length - 1);
    const isLast: boolean = length === 1 && isSigno(lastChartxt);

    return isLast;
  }

  /**devuelve  la cantidad actual con el signo a la derecha eliminado ejemplo 123+ = 123 */
  eliminarSignoDerecha(txt: string) {
    return new EliminarSignoDerecha(txt);
  }

  eliminarSingoIzquieda(txt: string) {
    return new EliminarSignoIzquieda(txt);
  }

  multiplicarPorMenosUno(txtCenter: string): string {
    const deleteSigno = this.eliminarSignoDerecha(txtCenter);
    // multiplicacion * -1
    let cantidad: string = deleteSigno.cantidad;
    cantidad = (Number(cantidad) * -1) + deleteSigno.signo;

    return cantidad;
  }

  /**Reemplaza la cantidad invertida en la cadena principal */
  ReemplazarEnCalcTxt(cantidad: string): string {
    const center = this.cantidadActual;
    let newStrActual = center.left + '|' + center.righ;
    newStrActual = this.eliminarSingoIzquieda(newStrActual).cantidad;
    let newStrCompleto = this.textCursor.start + '|' + this.textCursor.end;

    newStrCompleto = newStrCompleto
      .replace(
        newStrActual, cantidad
      );

    return newStrCompleto;
  }
}

