import { Injectable } from '@angular/core';
// tslint:disable-next-line:import-blacklist
import { Subject } from 'rxjs';
import { CalcService } from './calc.service';
import { TextCursorService } from './text-cursor.service';
import { TexCursor } from '../calc-class';

@Injectable({
  providedIn: 'root'
})
export class AddTextService {

  constructor(
    private calcService: CalcService,
    private textCursorService: TextCursorService
  ) {
    this.calcService
      .getPosicionCursor$()
      .subscribe(posicion => this.posicionCursor = posicion);

    this.textCursorService
      .getTextCursor$()
      .subscribe(text => this.textCursor = text);
  }

  private calcText = '';
  private calcText$ = new Subject<string>();
  private posicionCursor = 0;
  private textCursor: TexCursor = { start: '', end: '' };

  public get CalcText(): string {
    return this.calcText;
  }

  public setText(tecla: string) {
    this.addTexts(tecla);
    this.calcText$.next(this.CalcText);
  }

  public getText$() {
    return this.calcText$.asObservable();
  }

  /**
 * crea una cadena con las teclas pulsadas
 * @param tecla tecla pulsada
 */
  private addTexts(tecla: string): void {
    // seguir agregando texto cuando el cursor esta en la ultima posicion
    if (this.calcText.length === this.posicionCursor) {
      this.calcText += tecla;
    } else {
      // agregar  texto cuando el cursor esta dentro
      // de la cadena ejemplo: 12I4
      if (this.calcText.length > this.posicionCursor) {
        this.calcText = this.textCursor.start + tecla + this.textCursor.end;
      }
    }
  }

  public delete() {
    let textInicio = this.textCursor.start;

    if (this.calcText.length === this.posicionCursor) {
      this.calcText = this.calcText
        .substr(0, this.calcText.length - 1);
    } else if (this.calcText.length > this.posicionCursor) {
      textInicio = textInicio
        .substr(0, textInicio.length - 1);
      this.calcText = textInicio + this.textCursor.end;
    }
    this.calcText$.next(this.CalcText);
  }

}
