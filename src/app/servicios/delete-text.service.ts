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
  pattern = /((COS|SEN|TAN)\($)|(.{1}$)/;

  constructor(
    private textCursorService: TextCursorService,
  ) {
    this.textCursorService.getTextCursor$().subscribe(text => {
      this.calcText = text.start + '|' + text.end;
    });
  }

  buildText() {
    let split = this.calcText.split('|');
    this.textCursor = { start: split[0], end: split[1] };

    this.calcText = this.textCursor.start + this.textCursor.end;
  }

  /**elimina  un caracter de la cadena principal*/
  public delete(): string {
    this.buildText();
    const cosC = this.calcText.substr(this.calcText.length - 4);

    if (this.calcText.length === this.textCursor.start.length) {
      return this.calcText.replace(this.pattern, '');
    }

    return this.textCursor.start.replace(this.pattern, '') + this.textCursor.end;
  }
}
