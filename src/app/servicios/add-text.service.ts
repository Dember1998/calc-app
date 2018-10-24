import { Injectable } from '@angular/core';
// tslint:disable-next-line:import-blacklist
import { Subject } from 'rxjs';
import { TextCursorService } from './text-cursor.service';
import { TexCursor } from '../calc-class';
import { CursorService } from './cursor.service';
import { FilterSignService } from './filter-sign.service';
import { CalcSettingService } from '../calc-setting/calc-setting.service';
import { EscapeStrService } from './escape-str.service';
import { CalcService } from './calc.service';
import { isNumber } from '../funciones';

@Injectable({
  providedIn: 'root'
})
export class AddTextService {

  constructor(
    private cursorService: CursorService,
    private textCursorService: TextCursorService,
    private filterSignService: FilterSignService,
    private settingService: CalcSettingService,
    public escapeStrService: EscapeStrService,
    private calcService: CalcService
  ) {
    this.textCursorService.getTextCursor$().subscribe(text => {
      this.textCursor = text;
      this.posicionCursor = text.start.length;
    });

    this.calcService.getCalcText$().subscribe(text => { this.calcText = text; });

    this.emitText();
  }

  private calcText = '';
  private calcText$ = new Subject<string>();
  private posicionCursor = 0;
  private textCursor: TexCursor = { start: '', end: '' };

  private setCursor(posicion: number) {
    this.cursorService.setPosicionCursor(posicion + 1);
  }

  /* se vefificara que que la sintaxis este correcta
    por ejemplo si se intenta escribir dos signos seguidos 1.. o 1++,
    en caso de se incorrecta se finalizara la funcion
    */
  checkSyntax(tecla) {
    let noRepeatConfig = this.settingService.getChanges().noRepeat;
    if (noRepeatConfig) {
      return this.filterSignService.processkey(tecla);
    }

    return tecla;
  }

  /**se reciben la mayoria de las teclas pulsadas y se crea
   * una cadena a partir de esas pulsaciones
   */
  public createText(tecla: any) {

    if (!isNumber(tecla)) {
      tecla = this.checkSyntax(tecla);
      if (tecla === '') { return; }
    }

    this.addTexts(tecla);
    this.calcText = this.escapeStrService.escapeToEval(this.calcText);
    this.calculatePosCursor(tecla);
    this.emitText();
  }


  calculatePosCursor(tecla: string) {
    this.setCursor(this.posicionCursor + tecla.length);
  }

  emitText() {
    this.calcText$.next(this.calcText);
  }

  public getText$() {
    return this.calcText$.asObservable();
  }

  /**
 * crea una cadena con las teclas pulsadas
 * @param tecla tecla pulsada
 */
  private addTexts(tecla: string) {
    if (this.calcText.length === this.posicionCursor) {
      return this.calcText += tecla;
    }

    this.calcText = this.textCursor.start + tecla + this.textCursor.end;
  }

}
