import { Injectable } from '@angular/core';
import { TexCursor } from '../calc-class';
import { isSigno, strLast } from '../funciones';
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
  recortarIzquierda(): string {
    const cadenaIzquierda = this.textCursor.start;
    if (isSigno(cadenaIzquierda)) {
      const posicionSigno = this.posicionUltimoSigno(cadenaIzquierda);
      return cadenaIzquierda.substr(posicionSigno);
    } else { return cadenaIzquierda; }
  }

  // 12+2|53+23 = 53+
  recortarDerecha(): string {
    const cadenaDerecha = this.textCursor.end;
    if (isSigno(cadenaDerecha)) {
      const posicionSigno = this.posicionPrimerSigno(cadenaDerecha) + 1;
      return cadenaDerecha.substr(0, posicionSigno);
    } else { return cadenaDerecha; }
  }

  getTextCenter$(): Observable<ITexCenter> {
    return this.textCenterCursor$.asObservable();
  }

  log(txt) {
    console.log('center=', txt);
  }

  trimText(): ITexCenter {
    return {
      left: this.recortarIzquierda(),
      righ: this.recortarDerecha()
    };
  }

  returnObjet(left: string, righ: string, center?: string): ITexCenter {
    if (center) {
      return {
        center, left, righ
      };
    } else {
      return {
        center: left + righ,
        left,
        righ
      };
    }
  }



  // 12+345+6889 = +345+
  private TextCenterCursor(): ITexCenter {
    const txtLeft = this.textCursor.start;
    const txtRight = this.textCursor.end;

    // 1+|-23+5  = -23+
    if (isSigno(strLast(txtLeft)) && isSigno(txtRight[0])) {
      this.textCursor.end = txtRight.substr(1);
      // tslint:disable-next-line:no-shadowed-variable
      const { left, righ } = this.trimText();

      this.log(txtRight[0] + righ);
      return this.returnObjet(left, righ, txtRight[0] + righ);
    }

    // handle:  |-1+2 = -1+
    if (txtLeft === '' && isSigno(txtRight[0])) {
      this.textCursor.end = txtRight.substr(1);
      // tslint:disable-next-line:no-shadowed-variable
      const { left, righ } = this.trimText();

      this.log(txtRight[0] + righ);
      return this.returnObjet(left, righ, txtRight[0] + righ);
    }

    const { left, righ } = this.trimText();

    this.log(left + righ);

    return this.returnObjet(left, righ);
  }

  private posicionUltimoSigno(text: string) {
    return new PosicionSigno(text).Ultimo;
  }

  private posicionPrimerSigno(text: string) {
    return new PosicionSigno(text).Primer;
  }
}
