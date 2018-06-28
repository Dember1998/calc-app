import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { CalcComponent } from './calc/calc.component';
import { KeypadComponent } from './keypad/keypad.component';
import { CursorDirective } from './cursor.directive';
import { TextCalcDirective } from './text-calc.directive';
@NgModule({
  imports: [
    BrowserModule,
    FormsModule
  ],
  declarations: [
    AppComponent,
    CalcComponent,
    KeypadComponent,
    CursorDirective,
    TextCalcDirective,
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
