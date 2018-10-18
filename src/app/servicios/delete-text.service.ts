import { Injectable } from '@angular/core';
import { TexCursor } from '../calc-class';

@Injectable({
  providedIn: 'root'
})
export class DeleteTextService {

  textCursor: TexCursor;
  pattern = /(([A-Z]+\(?)|.)$/;

  constructor() { }

  buildText(calcText: string): string {
    let split = calcText.split('|');
    this.textCursor = { start: split[0], end: split[1] };

    return this.textCursor.start + this.textCursor.end;
  }

  /**elimina  un caracter de la cadena principal*/
  public delete(calcText = ''): string {
    if (!calcText || calcText === '|') { return ''; }

    calcText = this.buildText(calcText);

    if (calcText.length === this.textCursor.start.length) {
      return this.remove();
    }

    return this.remove();
  }

  remove() {
    return this.textCursor.start.replace(this.pattern, '') + this.textCursor.end;
  }
}
