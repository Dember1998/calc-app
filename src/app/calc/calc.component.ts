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
  /**Posicion actual del cursor en la operacion */
  posicionCursor = 0;
  /**contendra el resultado de cada operacion */
  resultado: number;
  /**Contine el la operacion actual */
  calcText = '';
  /**contiene el texto que esta a la izquierda y derecha del cursor */
  textCursor: TexCursor = { start: '', end: '' };
  /**la cantidad que esta bajo el cursor */
  private cantidadActual = '';

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

  private igual() {
    this.calcText = this.formatoService.parentisis(this.calcText);
    this.resultado = this.resolverOperacion.resolverOperacion(this.calcText);
  }

  private invertirNumbero() {
    // no llamar a invertir cuando la cadena sea vacia o
    // o cuando la cadena actual es un signo
    if (this.cantidadActual !== '' &&
      !(this.cantidadActual.length === 1 && isSigno(this.cantidadActual)) // 1+|
    ) {
      this.calcText = this.invertirService.invertir();
    }
  }

  private delete() {
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

    if (this.isBadSyntax(tecla)) {
      return;
    }

    if (tecla === '=') {
      this.igual();
    } else if (tecla === '+/-') {
      this.invertirNumbero();
    } else if (tecla === 'AC') {
      this.delete();
    } else if (this.isTrigonometria(tecla)) {
      this.addTexts(tecla + '(');
      this.calcService.setPosicionCursor(this.posicionCursor + 3);
    } else {
      this.addTexts(tecla);
    }

    this.resolveOperation();
    this.setCalcTextToService();
  }

  resolveOperation() {
    this.calcText = this.formatoService.zero(this.calcText);
    this.resultado = this.resolverOperacion.resolverOperacion(this.calcText);
  }

  private isBadSyntax(tecla: string): boolean {
    if (tecla === '.' && this.coma) {
      return true;
    } else if (tecla !== '+/-' && isSigno(tecla) && this.signo) {
      return true;
    }

    return false;
  }

  private isTrigonometria(tecla: string): boolean {
    if (tecla === 'SEN' || tecla === 'COS' ||
      tecla === 'TAN' || tecla === 'SQRT') {
      return true;
    } else {
      return false;
    }
  }

  /**
   * crea una cadena con las teclas pulsadas
   * @param tecla tecla pulsada
   */
  private addTexts(tecla: string): void {
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
  private setCalcTextToService() {
    this.calcService.setCalcText$(this.calcText);
  }

  /** habilita o deshabilita la escritura de la coma*/
  private filtrarComa() {
    this.coma = this.cantidadActual
      .includes('.') ? true : false;
  }

  /** habilita o deshabilita la escritura de los signos*/
  private filtrarSigno() {
    const
      star = this.textCursor.start,
      end = this.textCursor.end;

    this.signo = isSigno(star[star.length - 1]) ||
      isSigno(end[0]) ?
      true : false;

    // console.log('signo = ' + this.signo);
  }
}
