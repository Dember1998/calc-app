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
  calcText = '';

  constructor(
    private cursorService: CursorService,
    private textCursorService: TextCursorService,
  ) {
    this.cursorService.getPosicionCursor$().subscribe(posicion => this.posicionCursor = posicion);

    this.textCursorService.getTextCursor$().subscribe(text => {
      this.textCursor = text;
      this.calcText = text.start + text.end;
    });
  }

  /**elimina  un caracter de la cadena principal*/
  public delete(): string {
    const lengthTxt = this.calcText.length;
    const cosC = this.calcText.substr(lengthTxt - 4);

    if (lengthTxt === this.posicionCursor) {
      if (isTrigonometria(cosC, '(')) {
        return deleteLast(this.calcText, 4);
      }

      return deleteLast(this.calcText);
    }

    return deleteLast(this.textCursor.start) + this.textCursor.end;
  }
}
