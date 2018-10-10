import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CalcComponent } from './calc/calc.component';
import { CalcSettingComponent } from './calc-setting/calc-setting.component';


const routes: Routes = [
  { path: 'calc', component: CalcComponent },
  { path: 'setting', component: CalcSettingComponent },
  { path: '', redirectTo: 'calc', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }

