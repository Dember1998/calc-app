import { Component, OnInit } from '@angular/core';
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
  * historial de todas las operaciones
  */
  hitory: Observable<string[]>;

  constructor(private historiService: HistoryService) { }


  ngOnInit() {
    this.hitory = this.historiService.getAllHistory();
  }

}
