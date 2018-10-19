import { Injectable } from '@angular/core';
import { TextCursorService } from './text-cursor.service';

@Injectable({
  providedIn: 'root'
})
export class InvertirCantidadService {

  textWithCursor: string;

  cursorAnDigit = '(([0-9.]*\\|[0-9.]+)|([0-9.]+\\|[0-9.]*))';

  reg = {
    cursorBetweenSing: /(?<=[+-])\|[+-]\d+\.?\d*/,
    oneSignRegex: new RegExp('(?<=[^+-]\\)?)[+-]' + this.cursorAnDigit),
    twoSignRegex: new RegExp('(?<=[^+-][+-])[+-]' + this.cursorAnDigit),
    numberOrSignStart: new RegExp('(^\\|[+-]\\d+)|(^(?:[+-]|^)' + this.cursorAnDigit + ')'),
  };

  constructor(
    private textCursorService: TextCursorService
  ) {
    this.textCursorService.getTextCursor$().subscribe(textCursor => {
      this.textWithCursor = textCursor.start + '|' + textCursor.end;
    });
  }


  replace(val: any, action = '') {
    val = val.replace('|', '');

    if (action === 'add') {
      if (Math.sign(val) === -1) {
        return '-' + val;
      } else {
        return val[0] + (val * -1);
      }
    }

    return +val * -1;
  }

  invert(str: string) {

    if (!str.includes('|')) { throw new Error('no se encontro el cursor'); }
    let reg = this.reg;
    // handle 12+-23 to 12+23
    const handleTwoSign = () => {
      return str.replace(reg.twoSignRegex, (val) => this.replace(val));
    };

    // handle 12+23 to 12+-23
    const handleOneSign = () => {

      // handle 12-5|6 to 12--5|6
      if (reg.oneSignRegex.test(str)) {
        return str.replace(reg.oneSignRegex, val => this.replace(val, 'add'));
      }
      // handle 2|3 or -2|3
      // tslint:disable-next-line:one-line
      else if (reg.numberOrSignStart.test(str)) {
        return str.replace(reg.numberOrSignStart, (val) => this.replace(val));
      }
      // handle 12+|-56 to 12+|56
      // tslint:disable-next-line:one-line
      else if (reg.cursorBetweenSing.test(str)) {
        return str.replace(reg.cursorBetweenSing, (val) => this.replace(val));
      } else {
        throw new Error('la accion especificada no existe');
      }

    };

    return reg.twoSignRegex.test(str) ? handleTwoSign() : handleOneSign();
  }
  // convierte positivo a negativo y biseversa la cantidad actual
  invertir(): string {
    return this.invert(this.textWithCursor);
  }

}

