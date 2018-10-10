import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { CalcAppModule } from './calc-app/calc-app.module';
import { AppRoutingModule } from './app-routing.module';
import { AppNavComponent } from './calc-nav/calc-nav.component';
@NgModule({
  imports: [
    BrowserModule,
    CalcAppModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    AppNavComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
