import { Injectable } from '@angular/core';
import { isSigno } from '../funciones';

@Injectable({ providedIn: 'root' })
export class FormatearCadenasService {

  constructor() { }


  parentisis(_string: string): string {

    let newStrin = '',
      startParentesis = 0,
      endParentesis = 0;

    for (const current of _string) {
      if (current === '(') { startParentesis++; }
      if (current === ')') { endParentesis++; }
    }

    if (startParentesis === endParentesis) {
      return _string;
    } else
      if (startParentesis > endParentesis) {
        if (endParentesis !== 0) { startParentesis -= endParentesis; }

        for (let x = 0; x < startParentesis; x++) {
          _string += ')';
        }
        return _string;
      } else
        if (startParentesis < endParentesis) {
          if (startParentesis !== 0) { endParentesis -= startParentesis; }
          for (let x = 0; x < endParentesis; x++) {
            newStrin += '(';
          }
          newStrin += _string;
          return newStrin;
        }
  }

  isNumber(txt = ''): boolean {
    const is: boolean = Number.isNaN(+txt);
    return is;
  }

  zero(_string: string) {

    let newStrin = '';

    const add = (txt: string) => {
      newStrin += txt;
    };

    for (let i = 0; i < _string.length; i++) {

      const current = _string[i];
      const last = _string[i - 1];

      if (last === undefined && current === '.') {
        add('0.');
      } else if (last === '%' && this.isNumber(current)) {
        add('*' + current);
      } else if (isSigno(last) && current === '.') {
        add('0.');
      } else if (last === '.' && this.isNumber(current)) {
        add('0' + current);
      } else {
        add(current);
      }
    }
    return newStrin;
  }
}
