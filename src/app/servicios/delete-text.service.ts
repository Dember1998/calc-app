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
  calcText = '';

  constructor(
    private textCursorService: TextCursorService,
  ) {
    this.textCursorService.getTextCursor$().subscribe(text => {
      this.textCursor = text;
    });
  }

  /**elimina  un caracter de la cadena principal*/
  public delete(): string {
    this.calcText = this.textCursor.start + this.textCursor.end;
    const cosC = this.calcText.substr(this.calcText.length - 4);

    if (this.calcText.length === this.textCursor.start.length) {
      if (isTrigonometria(cosC, '(')) {
        return deleteLast(this.calcText, 4);
      }

      return deleteLast(this.calcText);
    }

    return deleteLast(this.textCursor.start) + this.textCursor.end;
  }
}
