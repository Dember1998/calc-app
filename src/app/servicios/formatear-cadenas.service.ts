import { Injectable } from '@angular/core';
import { isSigno, isNumber } from '../funciones';

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
}
