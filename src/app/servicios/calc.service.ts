import { Injectable } from '@angular/core';
// tslint:disable-next-line:import-blacklist
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CalcService {

  constructor() { }
  private calcText$ = new Subject<string>();

  /** obtiene el texto de la pantalla de la calculadora */
  getCalcText$(): Observable<string> {
    return this.calcText$.asObservable();
  }

  /** Evia el texto de la pantalla de la calculadora */
  setCalcText$(calcText = '') {
    this.calcText$.next(calcText);
  }
}
