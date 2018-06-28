import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { CalcComponent } from './calc/calc.component';
import { KeypadComponent } from './keypad/keypad.component';
import { CursorDirective } from './cursor.directive';
import { TextCalcDirective } from './text-calc.directive';
import { CadenasService } from './cadenas.service';
import { FormatearCadenasService } from './formatear-cadenas.service';

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
  providers: [
    CadenasService,
    FormatearCadenasService],

  bootstrap: [AppComponent]
})
export class AppModule { }
