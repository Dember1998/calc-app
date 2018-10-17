import { Injectable } from '@angular/core';
import { TexCursor } from '../calc-class';

@Injectable({
  providedIn: 'root'
})
export class DeleteTextService {

  textCursor: TexCursor;
  calcText = '';
  pattern = /((COS|SEN|TAN)\($)|(.{1}$)/;

  constructor() { }

  buildText() {
    let split = this.calcText.split('|');
    this.textCursor = { start: split[0], end: split[1] };

    this.calcText = this.textCursor.start + this.textCursor.end;
  }

  /**elimina  un caracter de la cadena principal*/
  public delete(str = ''): string {
    this.calcText = str;
    this.buildText();

    if (this.calcText.length === this.textCursor.start.length) {
      return this.calcText.replace(this.pattern, '');
    }

    return this.textCursor.start.replace(this.pattern, '') + this.textCursor.end;
  }
}
