import { Injectable } from '@angular/core';
// tslint:disable-next-line:import-blacklist
import { Subject } from 'rxjs';
import { TextCursorService } from './text-cursor.service';
import { TexCursor } from '../calc-class';
import { isTrigonometria, isNumber, isSigno, isConstant, deleteLast } from '../funciones';
import { CursorService } from './cursor.service';

@Injectable({
  providedIn: 'root'
})
export class AddTextService {

  constructor(
    private cursorService: CursorService,
    private textCursorService: TextCursorService,
  ) {
    this.cursorService
      .getPosicionCursor$()
      .subscribe(posicion => this.posicionCursor = posicion);

    this.textCursorService
      .getTextCursor$()
      .subscribe(text => {
        this.textCursor = text;
      });
  }

  private calcText = '';
  private calcText$ = new Subject<string>();
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

  private setCursor(posicion: number) {
    this.cursorService.setPosicionCursor(posicion + 1);
  }

  /**se reciben la mayoria de las teclas pulsadas y se crea
   * una cadena a partir de esas pulsaciones
   */
  public createText(tecla: any) {
    /* se vefificara que que la sintaxis este correcta
    por ejemplo si se intenta escribir dos signos seguidos 1.. o 1++,
    en caso de se incorrecta se finalizara la funcion
    */
    // tecla = this.filterSignService.processkey(tecla);
    //  if (tecla === false) { return; }

    if (/pi|e$/.test(this.calcText) && isNumber(tecla)) {
      this.addTexts('*');
      this.setCursor(this.posicionCursor + 1);
    }

    // 12pi = 12*pi
    if (isConstant(tecla)) {
      this.handleConstant(tecla);
    } else if (isTrigonometria(tecla)) {
      this.handleTrigonometria(tecla);
    } else {
      this.addZero(tecla);
    }
    this.calcText$.next(this.calcText);
  }

  private handleConstant(tecla: string) {
    if (this.isNumberLastChar) {
      this.addTexts(`*${tecla}`);
      this.setCursor(this.posicionCursor + 2);
    }
  }

  private handleTrigonometria(tecla: string) {
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
  }

  private addZero(tecla: string) {
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

  public setText(text: string) {
    this.calcText = text;
  }

  public getText$() {
    return this.calcText$.asObservable();
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

}
