import { Injectable } from '@angular/core';
import { TexCursor } from '../calc-class';
import { TextCursorService } from './text-cursor.service';
// tslint:disable-next-line:import-blacklist
import { Subject, Observable } from 'rxjs';


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
  private textCenterCursor$ = new Subject<string>();

  private setTextCenterCursor() {
    this.textCenterCursor$.next(this.TextCenterCursor());
  }

  getTextCenter$(): Observable<string> {
    return this.textCenterCursor$.asObservable();
  }

  textCenter(str = ''): string {

    const txtCenter = /((?<=[+-])\|[+-]\d+)|([\/*+-]?(?:(\d*\|\d+)|(\d+\|\d*))[\/*+-]?)/;

    let result: any = txtCenter.exec(str);
    if (!result) {
      throw new Error(`Fallo la expresion regular con \"${str}\" en textCenter`);
    }

    return this.removeCursor(result[0]);
  }

  // 12+345+6889 = +345+
  private TextCenterCursor(): string {
    const txtCalc = this.textCursor.start + '|' + this.textCursor.end;
    if (!txtCalc || txtCalc === '|') { return ''; }
    return this.textCenter(txtCalc);
  }

  removeCursor(str = ''): string {
    return str.replace('|', '');
  }
}
