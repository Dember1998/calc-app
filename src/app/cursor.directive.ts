import { Directive, ElementRef, HostListener, OnInit } from '@angular/core';
import { CalcService } from './servicios/calc.service';

@Directive({
  selector: '[appCursor]'
})
export class CursorDirective implements OnInit {

  posicionCursor: number; // posicion del cursor
  form: HTMLInputElement; // referencia al input text actual
  btn: HTMLElement; // referencial al boton actual

  ngOnInit(): void {
    this.calcService.getPosicionCursor$()
      .subscribe(valor => this.posicionCursor = valor);
    this.btn = this.el.nativeElement;
    this.form = document.getElementById('pantalla') as HTMLInputElement;
  }

  constructor(private calcService: CalcService, private el: ElementRef) { }

  setCursor(posicion: number) {
    this.form.selectionEnd = posicion;
    this.form.selectionStart = posicion;
  }

  @HostListener('mousedown') cursor() {
    setTimeout(() => {
      // cuando se presina la tecla de borrado la posicion del cursor
      // debe disminuir
      if (this.btn.innerHTML === 'AC') {
        this.setCursor(this.posicionCursor - 1);
      } else {
        // en caso de que la posicion del cursor este adentro del
        // texto su posicon no debe cambiar

        // el -1 a form.value se agrego porque la posicion del cursor
        // se atraza a -1
        if (this.posicionCursor < (this.form.value.length - 1)) {
          this.setCursor(this.posicionCursor);
        }
      }
      this.form.focus();
    }, 20);
  }

}

