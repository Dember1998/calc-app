import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class FormatearCadenasService {

  constructor() { }


  parentisis(_string: string): string {

    let newStrin = '',
      startParentesis = 0,
      endParentesis = 0;

    for (const iterator of _string) {
      if (iterator === '(') { startParentesis++; }
      if (iterator === ')') { endParentesis++; }
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

    let newStrin = '',
      lastInterator = '';
    const mysing = '*/+-';
    let iterator = '';

    for (let i = 0; i < _string.length; i++) {

      iterator = _string[i];
      lastInterator = _string[i - 1];

      if (lastInterator === undefined && iterator === '.') {
        newStrin += '0.';
      } else
        if (lastInterator === '%' && this.isNumber(iterator)) {
          newStrin += '*' + iterator;
        } else
          if (mysing.indexOf(lastInterator) >= 0 && iterator === '.') {
            newStrin += '0.';
          } else
            if (lastInterator === '.' && this.isNumber(iterator)) {
              newStrin += '0' + iterator;
            } else {
              newStrin += iterator;
            }
    }
    return newStrin;
  }
}
