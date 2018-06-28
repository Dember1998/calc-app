import { Injectable } from '@angular/core';
// tslint:disable-next-line:import-blacklist
import { Observable, Subject } from 'rxjs';
import { FormatearCadenasService } from './formatear-cadenas.service';

@Injectable({
  providedIn: 'root'
})
export class CalcService {

  constructor() { }
  private posicionCursor$ = new Subject<number>();
  private calcText$ = new Subject<string>();

  // obtienen y envian las posiciones del cursor
  // provenientes de directivas
  getPosicionCursor$(): Observable<number> {
    return this.posicionCursor$.asObservable();
  }

  setPosicionCursor(posicionCursor: number, llamada = 'no indicado') {
    this.posicionCursor$.next(posicionCursor);
    // console.log(`cursorService =${posicionCursor} de ${llamada}`);

  }

  /** obtiene el texto de la pantalla de la calculadora */
  getCalcText$(): Observable<string> {
    return this.calcText$.asObservable();
  }

  /** Evia el texto de la pantalla de la calculadora */
  setCalcText$(calcText: string) {
    this.calcText$.next(calcText);
  }
}
