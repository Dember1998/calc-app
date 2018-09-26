import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { CalcAppModule } from './calc-app/calc-app.module';
@NgModule({
  imports: [
    BrowserModule,
    CalcAppModule
  ],
  declarations: [
    AppComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
