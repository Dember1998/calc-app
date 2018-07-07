import { Injectable } from '@angular/core';
import { TexCursor } from '../calc-class';
import { isSigno } from '../funciones';
import { TextCursorService } from './text-cursor.service';
// tslint:disable-next-line:import-blacklist
import { Subject, Observable } from 'rxjs';
import { PosicionSigno } from './posicionSigno';

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
        this.textCursor = text;
        this.setTextCenterCursor();
      }
      );
  }

  private textCursor: TexCursor;
  private textCenterCursor$ = new Subject<ITexCenter>();

  private setTextCenterCursor() {
    this.textCenterCursor$.next(this.TextCenterCursor());
  }

  // 12+2|53+23 = +2
  recortarIzquierda (): string {
    const cadenaIzquierda = this.textCursor.start;
    if (isSigno(cadenaIzquierda)) {
      const posicionSigno = this.posicionUltimoSigno(cadenaIzquierda);
      return cadenaIzquierda.substr(posicionSigno);
    } else { return cadenaIzquierda; }
  }

  // 12+2|53+23 = 53+
  recortarDerecha (): string {
    const cadenaDerecha = this.textCursor.end;
    if (isSigno(cadenaDerecha)) {
      const posicionSigno = this.posicionPrimerSigno(cadenaDerecha) + 1;
      return cadenaDerecha.substr(0, posicionSigno);
    } else { return cadenaDerecha; }
  }

  getTextCenter$(): Observable<ITexCenter> {
    return this.textCenterCursor$.asObservable();
  }

  // 12+345+6889 = +345+
  private TextCenterCursor(): ITexCenter {
    const cadenaIzquierda = this.textCursor.start;
    let cadenaDerecha = this.textCursor.end;

    let
      left = '',
      righ = '';


    // 1+|-23+5  = -23+
    if (isSigno(cadenaIzquierda[cadenaIzquierda.length - 1]) && isSigno(cadenaDerecha[0])) {
      const primerSigno = cadenaDerecha[0];
      cadenaDerecha = cadenaDerecha.substr(1);
      righ = this.recortarDerecha();
      return { center: primerSigno + righ };
    }

    // -1+2 = -1+
    if (cadenaIzquierda === '' && isSigno(cadenaDerecha[0])) {
      const primerSigno = cadenaDerecha[0];
      cadenaDerecha = cadenaDerecha.substr(1);
      righ = this.recortarDerecha();
      return { center: primerSigno + righ };
    }

    left = this.recortarIzquierda();
    righ = this.recortarDerecha();

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
    return new PosicionSigno(text).Ultimo;
  }

  private posicionPrimerSigno(text: string) {
    return new PosicionSigno(text).Primer;
  }
}
