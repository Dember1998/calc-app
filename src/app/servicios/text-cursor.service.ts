import { Injectable } from '@angular/core';
import { CalcService } from './calc.service';
import { TexCursor } from '../calc-class';
// tslint:disable-next-line:import-blacklist
import { Subject, Observable } from 'rxjs';
import {CursorService} from './cursor.service';

@Injectable({
  providedIn: 'root'
})
export class TextCursorService {

  private calcText = '';
  private posicionCursor = 0;
  private textCursor$ = new Subject<TexCursor>();

  constructor(
    private calcService: CalcService,
    private cursorService: CursorService
  ) {
    this.calcService.getCalcText$()
      .subscribe(text => this.calcText = text);

    this.cursorService.getPosicionCursor$()
      .subscribe((posicion) => {
        this.posicionCursor = posicion;
        this.setTextCursor();
      });
  }

  private setTextCursor() {
    this.textCursor$.next(this.DivideText());
  }

  getTextCursor$(): Observable<TexCursor> {
    return this.textCursor$.asObservable();
  }

  private DivideText(): TexCursor {
    return {
      start: this.calcText.substr(0, this.posicionCursor),
      end: this.calcText.substr(this.posicionCursor)
    };
  }
}
