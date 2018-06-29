import { Component, OnInit } from '@angular/core';
import { Filas, TexCursor } from '../calc-class';
import { isSigno } from '../funciones';
import { CalcService } from '../servicios/calc.service';
import { FormatearCadenasService } from '../servicios/formatear-cadenas.service';
import { TextCenterService } from '../servicios/text-center.service';
import { ResolverOperacionService } from '../servicios/resolver-operacion.service';
import { InvertirCantidadService } from '../servicios/invertir-cantidad.service';
import { TextCursorService } from '../servicios/text-cursor.service';

@Component({
  selector: 'app-calc',
  templateUrl: './calc.component.html',
  styleUrls: ['./calc.component.css']
})
export class CalcComponent implements OnInit {
  posicionCursor = 0;
  resultado: number;
  calcText = '';
  textCursor: TexCursor = { start: '', end: '' };
  cantidadActual = '';

  coma: boolean;
  signo: boolean;

  constructor(
    public calcService: CalcService,
    public formatoService: FormatearCadenasService,
    private textCenterService: TextCenterService,
    private resolverOperacion: ResolverOperacionService,
    private invertirService: InvertirCantidadService,
    private textCursorService: TextCursorService
  ) { }

  ngOnInit() {
    this.calcService
      .getPosicionCursor$()
      .subscribe(posicion => {
        this.posicionCursor = posicion;

        this.textCursorService
          .getTextCursor$()
          .subscribe(text => this.textCursor = text);

        this.textCenterService
          .getTextCenter$()
          .subscribe(text => this.cantidadActual = text);
        // console.log(`cantidad actual = ${this.cantidadActual}`);
        this.filtrarComa();
        this.filtrarSigno();
      });
  }

  igual() {
    this.calcText = this.formatoService.parentisis(this.calcText);
    this.resultado = this.resolverOperacion.resolverOperacion(this.calcText);
  }

  invertirNumbero() {
    // no llamar a invertir cuando la cadena sea vacia o
    // o cuando la cadena actual es un signo
    if (this.cantidadActual !== '' &&
      !(this.cantidadActual.length === 1 && isSigno(this.cantidadActual)) // 1+|
    ) {
      this.calcText = this.invertirService.invertir();
    }
  }

  delete() {
    let textInicio = this.textCursor.start;

    if (this.calcText.length === this.posicionCursor) {
      this.calcText = this.calcText
        .substr(0, this.calcText.length - 1);
    } else if (this.calcText.length > this.posicionCursor) {
      textInicio = textInicio
        .substr(0, textInicio.length - 1);
      this.calcText = textInicio + this.textCursor.end;
    }
  }

  getTecla(tecla: string) {

    tecla = tecla === '+/-' ? 'invertir' : tecla;

    if (tecla === '.' && this.coma) { } else
      if (isSigno(tecla) && this.signo) { } else {
        switch (tecla) {
          case '=': this.igual(); break;
          case 'invertir': this.invertirNumbero(); break;
          case 'AC': this.delete(); break;

          case 'SEN':
          case 'COS':
          case 'TAN':
          case 'SQRT':
            this.addTexts(`${tecla}(`);
            this.calcService.setPosicionCursor(this.posicionCursor + 3);
            break;

          default: this.addTexts(tecla); break;
        }
      }
    this.calcText = this.formatoService.zero(this.calcText);
    this.resultado = this.resolverOperacion.resolverOperacion(this.calcText);
    this.setCalcTextToService();
  }
  /**
   * crea una cadena con las teclas pulsadas
   * @param tecla tecla pulsada
   */
  addTexts(tecla: string): void {
    // seguir agregando texto cuando el cursor esta en la ultima posicion
    if (this.calcText.length === this.posicionCursor) {
      this.calcText += tecla;
    } else {
      // agregar  texto cuando el cursor esta dentro
      // de la cadena ejemplo: 12I4
      if (this.calcText.length > this.posicionCursor) {
        this.calcText = this.textCursor.start + tecla + this.textCursor.end;
      }
    }
  }

  /** envia el texto actual a los servicios */
  setCalcTextToService() {
    this.calcService.setCalcText$(this.calcText);
  }

  // habilita o deshabilita la escritura de la coma
  filtrarComa() {
    this.coma = this.cantidadActual
      .includes('.') ? true : false;
  }

  // habilita o deshabilita la escritura de los signos
  filtrarSigno() {
    const
      star = this.textCursor.start,
      end = this.textCursor.end;

    this.signo = isSigno(star[star.length - 1]) ||
      isSigno(end[0]) ?
      true : false;

    // console.log('signo = ' + this.signo);
  }
}
