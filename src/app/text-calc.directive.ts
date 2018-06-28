import { Directive, ElementRef, HostListener, OnInit } from '@angular/core';
import { CalcService } from './calc.service';

@Directive({
  selector: '[appTextCalc]'
})
export class TextCalcDirective implements OnInit {

  form: HTMLInputElement; // referencial a la pantalla
  constructor(public el: ElementRef, private calcService: CalcService) {
    this.form = this.el.nativeElement;
  }

  ngOnInit() {
    this.setCursor();
  }

  @HostListener('mousedown') m() {
    this.setCursor();
  }

  @HostListener('keyup') s() {
    this.setCursor();
  }

  @HostListener('focus') g() {
    this.setCursor();
  }

  setCursor() {
    setTimeout(() => { // enviar la posicion del cursor
      this.calcService.setPosicionCursor(this.form.selectionStart);
    }, 20);
  }

}
