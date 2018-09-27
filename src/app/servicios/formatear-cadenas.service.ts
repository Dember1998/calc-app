import { Injectable } from '@angular/core';
import { isSigno, isNumber } from '../funciones';

@Injectable({ providedIn: 'root' })
export class FormatearCadenasService {

  constructor() { }
  myString: string;

  /**Devuelve la cantidad de parenteisis en la cadenea */
  private numParentesis() {
    let abre = 0;
    let cierre = 0;
    for (const current of this.myString) {
      if (current === '(') { abre++; }
      if (current === ')') { cierre++; }
    }
    return { abre, cierre };
  }

  /**Agrega los parentesis de cieere que faltan */
  addParentesisCierre(numAbre: number) {
    for (let x = 0; x < numAbre; x++) {
      this.myString += ')';
    }
    return this.myString;
  }

  /**Agrega los parenteis de abre que faltan */
  addParenteisAbre(numCierre: number) {
    let newStrin = '';
    for (let x = 0; x < numCierre; x++) {
      newStrin += '(';
    }
    newStrin += this.myString;
    return newStrin;
  }

  addParentisis(txt: string): string {

    this.myString = txt;

    const num = this.numParentesis();

    if (num.abre === num.cierre) {
      return this.myString;
    } else
      if (num.abre > num.cierre) {
        if (num.cierre !== 0) { num.abre -= num.cierre; }

        return this.addParentesisCierre(num.abre);
      } else
        if (num.abre < num.cierre) {
          return this.addParenteisAbre(num.cierre);
        }
  }
}
