import { Injectable } from '@angular/core';
import { isSigno, isNumber } from '../funciones';
import { CalcService } from './calc.service';
import { TextCenterService, ITexCenter } from './text-center.service';
import { TexCursor } from '../calc-class';
import { TextCursorService } from './text-cursor.service';

@Injectable({
  providedIn: 'root'
})
export class InvertirCantidadService {

  textCursor: TexCursor;
  cantidadActual: ITexCenter;

  constructor(
    private textCenterService: TextCenterService,
    private textCursorService: TextCursorService
  ) {

    this.textCenterService
      .getTextCenter$()
      .subscribe(text => this.cantidadActual = text);

    this.textCursorService
      .getTextCursor$()
      .subscribe(textCursor => this.textCursor = textCursor);
  }

  // convierte positivo a negativo y biseversa la cantidad actual
  invertir(): string {
    let txtCenter = this.getCantidadActual();
    let calcText = this.calcTextCursor;

    calcText = calcText.replace(txtCenter.match(/(\-?)(\d*)\|(\d*)/)[0], '|');
    txtCenter = this.invertirEsto(txtCenter);
    calcText = calcText.replace('|', txtCenter);
    calcText = this.reduceSignos(calcText);

    return this.removeCursor(calcText);
  }

  /**elimina signos repetidos */
  reduceSignos(str: string): string {
    for (let signo of '+-/*') {
      str = this.reduceMultiples(str, signo);
    }
    return str;
  }

  removeCursor(str: string) {
    let result = Array.from(str).filter(char => char !== '|');
    return ''.concat(...result);
  }

  /**Reduce múltiples instancias de un carácter particular que ocurren uno detrás de otro */
  reduceMultiples(str: string, character: string) {
    let pattern = new RegExp(`\\${character}{2,}`);
    return str.replace(pattern, character);
  }

  invertirEsto(cantidad: string) {
    if (isNumber(cantidad[0])) {
      return `-${cantidad}`;
    } else if (cantidad.startsWith('-')) {
      return cantidad.replace(/^\-/, '+');
    } else if (cantidad.startsWith('+')) {
      return cantidad.replace(/^\+/, '-');
    }
  }

  public get calcTextCursor(): string {
    return this.textCursor.start + '|' + this.textCursor.end;
  }

  /**
   * obtiene la cantidad actual con todas las apariciones de signos
   * a los lados
   */
  getCantidadActual(): string {
    let txtCenter = this.cantidadActual.centerCursor;
    txtCenter = this.escapeStrToRegExpr(txtCenter);

    let txtCenterCursor_REGEXP = new RegExp(`(\D*)${txtCenter}(\D*)`);
    let result = txtCenterCursor_REGEXP.exec(this.calcTextCursor);

    return result[0];
  }

  /**
   * prepara una cadena para ser utilizada en RegExpr
   */
  escapeStrToRegExpr(str: string) {
    let newStr = '';
    for (let char of str) {
      if (isSigno(char) || char.includes('|')) {
        newStr += '\\' + char;
      } else {
        newStr += char;
      }
    }
    return newStr;
  }
}

