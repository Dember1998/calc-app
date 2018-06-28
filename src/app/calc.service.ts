import { Injectable } from '@angular/core';
// tslint:disable-next-line:import-blacklist
import { Observable, Subject } from 'rxjs';
import { Teclas, TexCursor } from './calc-class';
import { FormatearCadenasService } from './formatear-cadenas.service';
import { isSigno } from './funciones';

@Injectable({
  providedIn: 'root'
})
export class CalcService {

  constructor() { }
  private posicionCursor$ = new Subject<number>();

  // obtienen y envian las posiciones del cursor
  // provenientes de directivas
  getPosicionCursor$(): Observable<number> {
    return this.posicionCursor$.asObservable();
  }

  setPosicionCursor(posicionCursor: number, llamada = 'no indicado') {
    this.posicionCursor$.next(posicionCursor);
    // console.log(`cursorService =${posicionCursor} de ${llamada}`);

  }
}
