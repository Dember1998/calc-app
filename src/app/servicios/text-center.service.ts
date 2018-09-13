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
    this.textCursorService.getTextCursor$().subscribe(text => {
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

  getTextCenter$(): Observable<ITexCenter> {
    return this.textCenterCursor$.asObservable();
  }

  // 12+345+6889 = +345+
  private TextCenterCursor(): ITexCenter {
    const txtCalc = this.textCursor.start + '|' + this.textCursor.end;


    function textCenter(str: string) {
      // handel +|-23
      if (/[\+\-\/\*]\|-/.test(str)) {
        const menos = /[\+\-\/\*]\|[\+\-\/\*]([0-9]+)([\+\-\/\*]*)/;
        // tslint:disable-next-line:no-shadowed-variable
        const result = menos.exec(str);
        return result ? result[0] : undefined;
      }

      const txtCenter = /([\+\-\/\*]?)(\d*)\|(\d*)([\+\-\/\*]?)/;
      let result: any = txtCenter.exec(str);
      result = result ? result[0] : undefined;

      return result;
    }

   const center = this.removeCursor(textCenter(txtCalc));

    return { center, left: '', righ: '' };
  }

  removeCursor(str: string) {
    let res: any = Array.from(str).filter(char => char !== '|');
    res = ''.concat(...res);
    return res;
  }
}
