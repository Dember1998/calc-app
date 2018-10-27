import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import { Observable } from 'rxjs/internal/Observable';
import { distinctUntilChanged } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CursorService {

  constructor() {
  }

  private posicionCursor$ = new Subject<number>();

  // obtienen y envian las posiciones del cursor
  // provenientes de directivas
  getPosicionCursor$(): Observable<number> {
    return this.posicionCursor$.asObservable();
  }

  setPosicionCursor(posicionCursor: number) {
    this.posicionCursor$.next(posicionCursor);
    // console.log(`cursorService =${posicionCursor} de ${llamada}`);

  }
}
