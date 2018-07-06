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
  posicionCursor = 0;

  constructor(
    public calcService: CalcService,
    private textCenterService: TextCenterService,
    private textCursorService: TextCursorService
  ) {

    this.calcService
      .getCalcText$()
      .subscribe(text => this.calcText = text);

    this.calcService
      .getPosicionCursor$()
      .subscribe(posicion => {
        this.posicionCursor = posicion;

        this.textCenterService
          .getTextCenter$()
          .subscribe(text => this.cantidadActual = text);
      });

    this.textCursorService
      .getTextCursor$()
      .subscribe(textCursor => this.textCursor = textCursor);
  }

  // convierte positivo a negativo y biseversa la cantidad actual
  invertir(): string {
    // no llamar a invertir  cuando la cadena actual es un signo
    if (this.cantidadActual.center.length === 1 &&
      isSigno(this.cantidadActual.center)) {
      return this.cantidadActual.center;
    }

    return this._Invertir();
  }

  private _Invertir(): string {
    // devuelve  la cantidad actual con el signo a la derecha eliminado
    // ejemplo 123+ = 123
    const deleteSigno = new EliminarSignoDerecha(this.cantidadActual.center);
    // cantidad actual con sus signos a la izquierda y derecha
    const center = this.cantidadActual;

    // multiplicacion * -1
    let cantidad: string = deleteSigno.cantidad;
    cantidad = (Number(cantidad) * -1) + deleteSigno.signo;

    let newStrActual = center.left + '|' + center.righ;
    newStrActual = new EliminarSignoIzquieda(newStrActual).cantidad;
    let newStrCompleto = this.textCursor.start + '|' + this.textCursor.end;

    newStrCompleto = newStrCompleto
      .replace(
        newStrActual, cantidad
      );

    return newStrCompleto;
  }
}

