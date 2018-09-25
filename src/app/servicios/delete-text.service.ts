import { Injectable } from '@angular/core';
import { isTrigonometria, deleteLast } from '../funciones';
import { CursorService } from './cursor.service';
import { TextCursorService } from './text-cursor.service';
import { TexCursor } from '../calc-class';

@Injectable({
  providedIn: 'root'
})
export class DeleteTextService {

  textCursor: TexCursor;
  posicionCursor: number;
  private calcText = '';

  constructor(
    private cursorService: CursorService,
    private textCursorService: TextCursorService,
  ) {
    this.cursorService.getPosicionCursor$().subscribe(posicion => {
      this.posicionCursor = posicion;
    });

    this.textCursorService.getTextCursor$().subscribe(text => {
      this.textCursor = text;
      this.calcText = text.start + text.end;
    });
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

      return this.calcText;
  }
}
