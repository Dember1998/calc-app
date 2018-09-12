import { Injectable } from '@angular/core';
import { TexCursor } from '../calc-class';
import { isSigno, strLast } from '../funciones';
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
        this.textCursor = text;
        this.setTextCenterCursor();
      }
      );
  }

  private textCursor: TexCursor;
  private textCenterCursor$ = new Subject<ITexCenter>();

  private signosOpcionales = '([\+\-\/\*]?)';

  private txtCenter =
    this.signosOpcionales + '([0-9]*)' +
    // cursor
    '[\|]' +

    '(' +

    //  |1+
    '(([0-9]+)' + this.signosOpcionales + ')|' +

    // number negative
    '((-[0-9]+)' + this.signosOpcionales + ')|' +

    // 12|+
    '(([0-9]*)' + this.signosOpcionales + ')' +
    ')';

  private setTextCenterCursor() {
    this.textCenterCursor$.next(this.TextCenterCursor());
  }

  getTextCenter$(): Observable<ITexCenter> {
    return this.textCenterCursor$.asObservable();
  }

  // 12+345+6889 = +345+
  private TextCenterCursor(): ITexCenter {
    const txtCalc = this.textCursor.start + '|' + this.textCursor.end;


    const patron = new RegExp(this.txtCenter);

    const exec = txtCalc.match(patron);

    // console.log('completo ', exec);

    const res = exec ? exec[0] : undefined;

    // console.log('cadena : ', str);
    // console.log('patron :', patron.source);
    // console.log(exec);

    let final: any = Array.from(res);
    final = final.filter(str => str !== '|');
    final = ''.concat(...final);

    return { center: final, left: '', righ: '' };
  }
}
