import { Injectable } from '@angular/core';
// tslint:disable-next-line:import-blacklist
import {  Observable, of } from 'rxjs';
import { CalcService } from './calc.service';
import { TextCursorService } from './text-cursor.service';
import { TexCursor } from '../calc-class';
import { FormatearCadenasService } from './formatear-cadenas.service';
import { isTrigonometria, isNumber, isSigno, isConstant, deleteLast } from '../funciones';
import { FilterSignService } from './filter-sign.service';

@Injectable({
  providedIn: 'root'
})
export class AddTextService {

  constructor(
    private calcService: CalcService,
    private textCursorService: TextCursorService,
    private formatoService: FormatearCadenasService,
    private filterSignService: FilterSignService
  ) {
    this.calcService
      .getPosicionCursor$()
      .subscribe(posicion => this.posicionCursor = posicion);

    this.textCursorService
      .getTextCursor$()
      .subscribe(text => {
        this.textCursor = text;
      });
  }

  private calcText = '';
  private posicionCursor = 0;
  private textCursor: TexCursor = { start: '', end: '' };


  /**lastChar of textCursor.start */
  private get lastChar(): string {
    return this.textCursor.start.charAt(
      this.textCursor.start.length - 1
    );
  }

  /**es numero el ultimo caracterde this.calcText */
  private get isNumberLastChar() {
    return isNumber(this.calcText.charAt(this.calcText.length - 1));
  }

  /** si los ultimos caracteres terminan en 'pi' 123pi  de this.calcText*/
  private get isLastConst() {
    const i = this.calcText.charAt(this.calcText.length - 1);
    const p = this.calcText.charAt(this.calcText.length - 2);
    return isConstant(p + i);
  }

  private setCursor(posicion: number) {
    this.calcService.setPosicionCursor(posicion + 1);
  }

  /**se reciben la mayoria de las teclas pulsadas y se crea
   * una cadena a partir de esas pulsaciones
   */
  public createText(tecla: string): Observable<string> {

    /* se vefificara que que la sintaxis este correcta
    por ejemplo si se intenta escribir dos signos seguidos 1.. o 1++,
    en caso de se incorrecta se finalizara la funcion
    */
    tecla = this.filterSignService.processkey(tecla);
    if (!tecla) { return; }

    if (this.isLastConst && isNumber(tecla)) {
      this.addTexts('*');
      this.setCursor(this.posicionCursor + 1);
    }

    // 12pi = 12*pi
    if (isConstant(tecla)) {
      if (this.isNumberLastChar) {
        this.addTexts(`*${tecla}`);
        this.setCursor(this.posicionCursor + 2);
      }
    } else if (isTrigonometria(tecla)) {
      // 123COS = 123*COS(
      if (this.isNumberLastChar) {
        this.addTexts(`*${tecla}(`);
      } else {
        this.addTexts(tecla + '(');
      }
      if (tecla === 'SQRT') {
        this.setCursor(this.posicionCursor + 5);
      } else {
        this.setCursor(this.posicionCursor + 4);
      }
    } else {
      if (!this.calcText && tecla === '.') {
        this.addTexts(`0.`);
      } else if (this.lastChar === '%' && isNumber(tecla)) {
        this.addTexts(`*${tecla}`); // 4%2 = 4%*2
      } else if (isSigno(this.lastChar) && tecla === '.') {
        this.addTexts(`0.`); // 1+. = 1+0.
      } else if (this.lastChar === '.' && isSigno(tecla)) {
        this.addTexts(`0${tecla}`); // 1.+ = 1.0+
      } else {
        this.addTexts(tecla);
      }
    }
    return of(this.calcText);
  }

  public setText(text: string) {
    this.calcText = text;
  }

  /**
 * crea una cadena con las teclas pulsadas
 * @param tecla tecla pulsada
 */
  private addTexts(tecla: string): void {
    // seguir agregando texto cuando el cursor esta en la ultima posicion
    if (this.calcText.length === this.posicionCursor) {
      this.calcText += tecla;
    } else {
      // agregar  texto cuando el cursor esta dentro
      // de la cadena ejemplo: 12I4
      if (this.calcText.length > this.posicionCursor) {
        this.calcText = this.textCursor.start + tecla + this.textCursor.end;
      }
    }
  }

  /**elimina  un caracter de la cadena principal*/
  public delete() {
    let textInicio = this.textCursor.start;
    /** this.calcText.length */
    const lengthTxt = this.calcText.length;
    // 1+2|

    // COS(
    const cosC = this.calcText.substr(lengthTxt - 4);
    if (lengthTxt === this.posicionCursor) {
      // eliminar COS(
      if (isTrigonometria(cosC, '(')) {
        this.calcText = this.calcText.substr(0, lengthTxt - 4);
      } else {
        this.calcText = deleteLast(this.calcText);
      }
    } else
      // 1+|2
      if (lengthTxt > this.posicionCursor) {
        textInicio = deleteLast(textInicio);
        this.calcText = textInicio + this.textCursor.end;
      }
  }

}
