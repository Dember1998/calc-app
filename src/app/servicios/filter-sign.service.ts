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
  private signo: boolean;
  /**contiene el texto que esta a la izquierda y derecha del cursor */
  private textCursor: TexCursor = { start: '', end: '' };
  private coma: boolean;
  /**la cantidad que esta bajo el cursor */
  private cantidadActual: string;
  keyPress: string;

  constructor(
    private textCenterService: TextCenterService,
    private textCursorService: TextCursorService,
  ) {

    this.textCenterService.getTextCenter$().subscribe(text => this.cantidadActual = text);

    this.textCursorService.getTextCursor$().subscribe(text => {
      this.textCursor = text;
    });
  }

  public processkey(key: string): string {
    this.keyPress = key;

    this.filtrarSigno();
    this.filtrarComa();

    if (this.coma && key === '.') { key = ''; }
    if (this.signo && this.isEqualSign(key)) { key = ''; }

    return key;
  }

  isEqualSign(txt) {
    return txt === '+' || txt === '-' || txt === '*' || txt === '/';
  }

  /** habilita o deshabilita la escritura de la coma*/
  private filtrarComa() {
    this.coma = this.cantidadActual
      .includes('.') ? true : false;
  }

  /** habilita o deshabilita la escritura de los signos*/
  private filtrarSigno() {
    const star = this.textCursor.start;
    const last = star[star.length - 1];

    if (last === this.keyPress) {
      this.signo = isSigno(last) || isSigno(this.textCursor.end[0]);
      return;
    } else {
      if (this.keyPress === '+' || this.keyPress === '-') {
        this.signo = false;
        return;
      }
    }

    // console.log('signo = ' + this.signo);
  }
}
