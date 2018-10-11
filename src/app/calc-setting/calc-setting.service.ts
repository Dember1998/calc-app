import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalcSettingService {

  constructor() { }

  private config = {
    noRepeat: true
  };

  updateChanges(
    setting: {
      noRepeat: boolean
    }
  ) {
    this.config = setting;
  }

  getChanges() {
    return this.config;
  }

}
