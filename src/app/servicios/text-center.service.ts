import { Injectable } from '@angular/core';
import { TexCursor } from '../calc-class';
import { TextCursorService } from './text-cursor.service';
// tslint:disable-next-line:import-blacklist
import { Subject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TextCenterService {

  txtCenter: RegExp;

  constructor(
    private textCursorService: TextCursorService
  ) {
    this.textCursorService.getTextCursor$().subscribe(text => {
      this.textCursor = text;
      this.setTextCenterCursor();
    }
    );

    const cursorBetween = '((?<=[+-])\\|[+-]\\d+)';
    const num1 = '([0-9.]*\\|[0-9.]+)';
    const num2 = '([0-9.]+\\|[0-9.]*[\\/*+-]?)';

    const cursorAndNumber = '(' + num1 + '|' + num2 + ')';
    this.txtCenter = new RegExp(cursorBetween + '|' + cursorAndNumber);
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

    let result: any = this.txtCenter.exec(str);
    if (!result) {
      return '';
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
