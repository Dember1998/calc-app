import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalcComponent } from '../calc/calc.component';
import { KeypadComponent } from '../keypad/keypad.component';
import { HistoryComponent } from '../history/history.component';
import { CursorDirective } from '../cursor.directive';
import { TextCalcDirective } from '../text-calc.directive';
import { KeypadScientificComponent } from '../keypad-scientific/keypad-scientific.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    CalcComponent,
    KeypadComponent,
    CursorDirective,
    TextCalcDirective,
    HistoryComponent,
    KeypadScientificComponent,
  ],
  exports: [
    CalcComponent,
  ]
})
export class CalcAppModule { }
