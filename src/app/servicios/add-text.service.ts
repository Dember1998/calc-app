import { Injectable } from '@angular/core';
// tslint:disable-next-line:import-blacklist
import { Subject } from 'rxjs';
import { CalcService } from './calc.service';
import { TextCursorService } from './text-cursor.service';
import { TexCursor } from '../calc-class';
import { FormatearCadenasService } from './formatear-cadenas.service';
import { isTrigonometria, isNumber } from '../funciones';

@Injectable({
  providedIn: 'root'
})
export class AddTextService {

  constructor(
    private calcService: CalcService,
    private textCursorService: TextCursorService,
    private formatoService: FormatearCadenasService
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
  private calcText$ = new Subject<string>();
  private posicionCursor = 0;
  private textCursor: TexCursor = { start: '', end: '' };

  public get CalcText(): string {
    return this.calcText;
  }

  /**se reciben la mayoria de las teclas pulsadas y se crea
   * una cadena a partir de esas pulsaciones
   */
  public setChar(tecla: string) {
    if (isTrigonometria(tecla)) {

      if (isNumber(this.calcText.charAt(this.calcText.length - 1))) {
        this.addTexts(`*${tecla}(`);
      } else {
        this.addTexts(tecla + '(');
      }
      this.calcService.setPosicionCursor(this.posicionCursor + 3);
    } else {
      this.addTexts(tecla);
    }
    this.calcText$.next(this.CalcText);
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

  /**elimina  un caracter de la cadena principal*/
  public delete() {
    let textInicio = this.textCursor.start;

    if (this.calcText.length === this.posicionCursor) {
      this.calcText = this.calcText
        .substr(0, this.calcText.length - 1);
    } else if (this.calcText.length > this.posicionCursor) {
      textInicio = textInicio
        .substr(0, textInicio.length - 1);
      this.calcText = textInicio + this.textCursor.end;
    }
    this.calcText$.next(this.CalcText);
  }

}
