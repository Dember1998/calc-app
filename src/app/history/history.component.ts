import { Component, OnInit, Output, EventEmitter } from '@angular/core';
// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs';
import { HistoryService } from '../servicios/history.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  /**
   * emite  la historia seleccionada en la lista
   */
  @Output() HistorySelect = new EventEmitter<string>();
  /**
  * historial de todas las operaciones
  */
  hitory: Observable<string[]>;

  constructor(private historiService: HistoryService) { }


  ngOnInit() {
    this.hitory = this.historiService.getAllHistory();
  }

  emitHistory(history: string) {
    this.HistorySelect.emit(history);
  }

}
