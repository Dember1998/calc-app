import { Component, OnInit } from '@angular/core';
import { Filas, TexCursor } from '../calc-class';
import { isSigno } from '../funciones';
import { CalcService } from '../servicios/calc.service';
import { FormatearCadenasService } from '../servicios/formatear-cadenas.service';
import { TextCenterService } from '../servicios/text-center.service';
import { ResolverOperacionService } from '../servicios/resolver-operacion.service';
import { InvertirCantidadService } from '../servicios/invertir-cantidad.service';
import { TextCursorService } from '../servicios/text-cursor.service';
import { AddTextService } from '../servicios/add-text.service';

@Component({
  selector: 'app-calc',
  templateUrl: './calc.component.html',
  styleUrls: ['./calc.component.css']
})
export class CalcComponent implements OnInit {
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
    private textCursorService: TextCursorService,
    private addTextService: AddTextService
  ) { }

  ngOnInit() {
    this.calcService
      .getPosicionCursor$()
      .subscribe((posicion) => {
        this.posicionCursor = posicion;
        this.filtrarComa();
        this.filtrarSigno();
      });

    this.textCenterService
      .getTextCenter$()
      .subscribe(text => this.cantidadActual = text);

    this.textCursorService
      .getTextCursor$()
      .subscribe(text => this.textCursor = text);

    this.addTextService
      .getText$()
      .subscribe(text => this.calcText = text);
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


  getTecla(tecla: string) {

    if (this.isBadSyntax(tecla)) {
      return;
    }

    if (tecla === '=') {
      this.igual();
    } else if (tecla === '+/-') {
      this.invertirNumbero();
    } else if (tecla === 'AC') {
      this.addTextService.delete();
    } else {
      this.addTextService.setText(tecla);
    }

    this.resolveOperation();
    this.setCalcTextToService();
  }

  resolveOperation() {
    this.resultado = this.resolverOperacion.resolverOperacion(this.calcText);
  }

  /**Debuelve true si hay un erro de sintanxis
   * como cuando se intenta esciribir dos comas seguida "12.."
   * o dos signos siguidos "+12++"
   */
  private isBadSyntax(tecla: string): boolean {
    if (tecla === '.' && this.coma) {
      return true;
    } else if (tecla !== '+/-' && isSigno(tecla) && this.signo) {
      return true;
    }
    return false;
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
