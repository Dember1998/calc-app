import { Injectable } from '@angular/core';
import { TextCenterService } from './text-center.service';
import { isSigno } from '../funciones';
import { TextCursorService } from './text-cursor.service';
import { TexCursor } from '../calc-class';
import { CalcService } from './calc.service';

@Injectable({
  providedIn: 'root'
})
export class FilterSignService {

  posicionCursor: number;
  private signo: boolean;
  /**contiene el texto que esta a la izquierda y derecha del cursor */
  private textCursor: TexCursor = { start: '', end: '' };
  private coma: boolean;
  /**la cantidad que esta bajo el cursor */
  private cantidadActual: string;

  constructor(
    public calcService: CalcService,
    private textCenterService: TextCenterService,
    private textCursorService: TextCursorService,
  ) {

    this.calcService
      .getPosicionCursor$()
      .subscribe((posicion) => {
        this.posicionCursor = posicion;
        this.filtrarComa();
        this.filtrarSigno();
      });

    this.textCenterService
      .getTextCenter$()
      .subscribe(text => this.cantidadActual = text.center);

    this.textCursorService
      .getTextCursor$()
      .subscribe(text => this.textCursor = text);
  }

  public processkey(key: string): string | boolean {

    console.log('procesando desde filterService');

    if (key === '.' && this.coma) {
      return false;
    } else if (key !== '+/-' && isSigno(key) && this.signo) {
      return false;
    }

    return key;
  }

  /** habilita o deshabilita la escritura de la coma*/
  private filtrarComa() {
    this.coma = this.cantidadActual
      .includes('.') ? true : false;
  }

  /** habilita o deshabilita la escritura de los signos*/
  private filtrarSigno() {
    const
      star = this.textCursor.start,
      end = this.textCursor.end;

    this.signo = isSigno(star[star.length - 1]) ||
      isSigno(end[0]) ?
      true : false;

    // console.log('signo = ' + this.signo);
  }
}
