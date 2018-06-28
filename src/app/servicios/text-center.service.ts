import { Injectable } from '@angular/core';
import { TexCursor } from '../calc-class';
import { isSigno } from '../funciones';

@Injectable({
  providedIn: 'root'
})
export class TextCenterService {

  constructor() { }

  // 12+345+6889 = +345+
  TextCenterCursor(textCursor: TexCursor): string {
    const cadenaIzquierda = textCursor.start;
    let cadenaDerecha = textCursor.end;

    let
      textCenterLef = '',
      textCenterRigh = '';

    // 12+2|53+23 = +2
    const recortarIzquierda = (): void => {
      if (isSigno(cadenaIzquierda)) {
        const posicionSigno = this.posicionUltimoSigno(cadenaIzquierda);
        textCenterLef = cadenaIzquierda.substr(posicionSigno);
      } else { textCenterLef = cadenaIzquierda; }
    };

    // 12+2|53+23 = 53+
    const recortarDerecha = (): void => {
      if (isSigno(cadenaDerecha)) {
        const posicionSigno = this.posicionPrimerSigno(cadenaDerecha);
        textCenterRigh = cadenaDerecha.substr(0, posicionSigno);
      } else { textCenterRigh = cadenaDerecha; }
    };

    // 1+|-23+5  = -23+
    if (isSigno(cadenaIzquierda[cadenaIzquierda.length - 1]) && isSigno(cadenaDerecha[0])) {
      const primerSigno = cadenaDerecha[0];
      cadenaDerecha = cadenaDerecha.substr(1);
      recortarDerecha();
      return primerSigno + textCenterRigh;
    }

    // -1+2 = -1+
    if (cadenaIzquierda === '' && isSigno(cadenaDerecha[0])) {
      const primerSigno = cadenaDerecha[0];
      cadenaDerecha = cadenaDerecha.substr(1);
      recortarDerecha();
      return primerSigno + textCenterRigh;
    }

    recortarIzquierda();
    recortarDerecha();

    const textCenterCursor = textCenterLef + textCenterRigh;
    // console.log(`left =${textCenterLef} righ =${textCenterRigh}`);

    return textCenterCursor;
  }

  posicionUltimoSigno(text: string) {
    let posicion = -1;
    for (let i = text.length - 1; i >= 0; i--) {
      const iterator = text[i];
      if (iterator === '*' ||
        iterator === '/' ||
        iterator === '+' ||
        iterator === '-') { posicion = i; break; }
    }
    return posicion;
  }

  posicionPrimerSigno(text: string) {
    let posicion = -1;
    for (let i = 0; i < text.length; i++) {
      const iterator = text[i];
      if (iterator === '*' ||
        iterator === '/' ||
        iterator === '+' ||
        iterator === '-') { posicion = i + 1; break; }
    }
    return posicion;
  }
}
