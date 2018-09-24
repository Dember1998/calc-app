import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalcComponent } from './calc/calc.component';
import { KeypadComponent } from './keypad/keypad.component';
import { CursorDirective } from './cursor.directive';
import { TextCalcDirective } from './text-calc.directive';
import { HistoryComponent } from './history/history.component';
import { KeypadScientificComponent } from './keypad-scientific/keypad-scientific.component';
@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    AppComponent,
    CalcComponent,
    KeypadComponent,
    CursorDirective,
    TextCalcDirective,
    HistoryComponent,
    KeypadScientificComponent,
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
