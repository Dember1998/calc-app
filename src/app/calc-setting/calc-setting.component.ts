import { Component, OnInit } from '@angular/core';
import { CalcSettingService } from './calc-setting.service';

@Component({
  selector: 'app-calc-setting',
  template: `
  <div class="container py-3">
   <div class="form-group">
      <div class="custom-control custom-checkbox">
        <input type="checkbox" [(ngModel)]="noRepeat" class="custom-control-input" id="same-address">
        <label class="custom-control-label" for="same-address">no repetir signos</label>
      </div>
    </div>
    <button class="btn btn-success" (click)="save()">save</button>
  </div>
  `,
  styles: []
})
export class CalcSettingComponent implements OnInit {

  constructor(public calcSettingService: CalcSettingService) { }

  noRepeat = true;

  ngOnInit() {
  }

  save() {
    this.calcSettingService.updateChanges({
      noRepeat: this.noRepeat
    });
  }

}
