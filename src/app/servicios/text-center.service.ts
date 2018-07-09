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
    const txtLeft = this.textCursor.start;
    let txtRight = this.textCursor.end;

    let left = '', righ = '';


    // 1+|-23+5  = -23+
    if (isSigno(txtLeft[txtLeft.length - 1]) && isSigno(txtRight[0])) {
      const Signo = txtRight[0];
      txtRight = txtRight.substr(1);
      righ = this.recortarDerecha();
      return { center: Signo + righ };
    }

    // -1+2 = -1+
    if (txtRight === '' && isSigno(txtRight[0])) {
      const Signo = txtRight[0];
      txtRight = txtRight.substr(1);
      righ = this.recortarDerecha();
      return { center: Signo + righ };
    }

    left = this.recortarIzquierda();
    righ = this.recortarDerecha();

    // console.log(`left =${left} righ =${righ}`);

    console.log('center=', left + righ);

    return {
      center: left + righ,
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
