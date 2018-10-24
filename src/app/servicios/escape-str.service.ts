import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EscapeStrService {

  constructor() { }

  escapeToEval(txt: string): string {
    txt = this.btn(txt);

    if (txt.includes('pi') || txt.includes('e')) {
      txt = txt.replace(/(?<=\d)(pi|e)/gi, '*$1');
      txt = txt.replace(/(pi|e)(?=\d)/, '$1*');
    }

    if (txt.includes('COS') || txt.includes('SEN') || txt.includes('TAN')) {
      txt = txt.replace(/(\d|^)(COS|SEN|TAN)(?!\()/gi, (...mathes) => {
        if (mathes[1] === '') {
          return mathes[2] + '(';
        }

        return mathes[1] + '*' + mathes[2] + '(';
      });
    }

    return this.addZero(txt);
  }

  addZero(txt: string) {
    if (!txt.includes('.')) { return txt; }

    if (txt === '.') {
      return '0.';
    }

    if (!txt.endsWith('.')) {
      let zeroRegExp = /(?:\d\.(?!\d))|(?:(?<!\d)\.\d)/g;
      txt = txt.replace(zeroRegExp, x => x.endsWith('.') ? x + '0' : +x + '');
    }

    return txt;
  }

  btn(str: string) {
    if (str === '*' || str === '/') {
      return '\uE500' + str;
    }

    if (str.includes('\uE500')) {
      str = str.replace(
        /(?:(\d)\uE500)|(?:\uE500(\d))/,
        (...mathes) => mathes[1] ? mathes[1] : mathes[2]
      );
    }

    return str;
  }

}
