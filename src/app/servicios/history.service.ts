import { Injectable } from '@angular/core';
// tslint:disable-next-line:import-blacklist
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  constructor() { }

  private history$ = new Subject<string[]>();
  private history: string[] = [];

  addHistory(op: string) {
    this.history.push(op);
    this.history$.next(this.history);
  }

  getAllHistory(): Observable<string[]> {
    return this.history$.asObservable();
  }

}
