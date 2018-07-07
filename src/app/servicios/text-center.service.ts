import { Injectable } from '@angular/core';
import { TexCursor } from '../calc-class';
import { isSigno } from '../funciones';
import { TextCursorService } from './text-cursor.service';
// tslint:disable-next-line:import-blacklist
import { Subject, Observable } from 'rxjs';

/** cantidad bajo el cursor*/
export interface ITexCenter {
  /** cantidad bajo el cursor, con su signos */
  center?: string;
  /**la cadena a la izquierda de "center"*/
  left?: string;
  // **cadena a la derecha de "center" */
  righ?: string;
}

@Injectable({
  providedIn: 'root'
})
export class TextCenterService {

  constructor(
    private textCursorService: TextCursorService
  ) {
    this.textCursorService
      .getTextCursor$()
      .subscribe(text => {
        this.textCenter = this.TextCenterCursor(text);
        this.setTextCenterCursor();
      }
      );
  }

  private textCenterCursor$ = new Subject<ITexCenter>();
  private textCenter: ITexCenter = { center: '' };

  private setTextCenterCursor() {
    this.textCenterCursor$.next(this.textCenter);
  }

  getTextCenter$(): Observable<ITexCenter> {
    return this.textCenterCursor$.asObservable();
  }

  // 12+345+6889 = +345+
  private TextCenterCursor(textCursor: TexCursor): ITexCenter {
    const cadenaIzquierda = textCursor.start;
    let cadenaDerecha = textCursor.end;

    let
      left = '',
      righ = '';

    // 12+2|53+23 = +2
    const recortarIzquierda = (): void => {
      if (isSigno(cadenaIzquierda)) {
        const posicionSigno = this.posicionUltimoSigno(cadenaIzquierda);
        left = cadenaIzquierda.substr(posicionSigno);
      } else { left = cadenaIzquierda; }
    };

    // 12+2|53+23 = 53+
    const recortarDerecha = (): void => {
      if (isSigno(cadenaDerecha)) {
        const posicionSigno = this.posicionPrimerSigno(cadenaDerecha);
        righ = cadenaDerecha.substr(0, posicionSigno);
      } else { righ = cadenaDerecha; }
    };

    // 1+|-23+5  = -23+
    if (isSigno(cadenaIzquierda[cadenaIzquierda.length - 1]) && isSigno(cadenaDerecha[0])) {
      const primerSigno = cadenaDerecha[0];
      cadenaDerecha = cadenaDerecha.substr(1);
      recortarDerecha();
      return { center: primerSigno + righ };
    }

    // -1+2 = -1+
    if (cadenaIzquierda === '' && isSigno(cadenaDerecha[0])) {
      const primerSigno = cadenaDerecha[0];
      cadenaDerecha = cadenaDerecha.substr(1);
      recortarDerecha();
      return { center: primerSigno + righ };
    }

    recortarIzquierda();
    recortarDerecha();

    const textCenterCursor = left + righ;
    // console.log(`left =${left} righ =${righ}`);

    console.log('center=', textCenterCursor);

    return {
      center: textCenterCursor,
      left,
      righ
    };
  }

  private posicionUltimoSigno(text: string) {
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

  private posicionPrimerSigno(text: string) {
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
