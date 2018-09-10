import { Injectable } from '@angular/core';
// tslint:disable-next-line:import-blacklist
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  constructor() { }
  /**
   * emisor de eventos del historial
   */
  private history$ = new Subject<string[]>();
  /**
   * aqui se guardara el historial
   */
  private history: string[] = [];
  /**
   * agrega una operacion al historial
   * @param op operacion a guardar
   */
  addHistory(op: string) {
    this.history.push(op);
    this.history$.next(this.history);
  }
  /**
   * devuelve todo el historial
   */
  getAllHistory(): Observable<string[]> {
    return this.history$.asObservable();
  }

}
