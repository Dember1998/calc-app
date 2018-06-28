import { Component, OnInit } from '@angular/core';
import { CalcService } from '../calc.service';
import { Filas, TexCursor } from '../calc-class';
import { FormatearCadenasService } from '../formatear-cadenas.service';
import { TextCenterService } from '../text-center.service';

@Component({
  selector: 'app-calc',
  templateUrl: './calc.component.html',
  styleUrls: ['./calc.component.css']
})
export class CalcComponent implements OnInit {
  posicionCursor = 0;
  resultado: number;
  calcText = '';
  textCursor: TexCursor;
  cantidadActual: string;

  coma: boolean;
  signo: boolean;

  constructor(
    public calcService: CalcService,
    public formatoService: FormatearCadenasService,
    private textCenterService: TextCenterService
  ) { }

  ngOnInit() {
    this.calcService.getPosicionCursor$()
      .subscribe(posicion => {
        this.posicionCursor = posicion;
        this.DivideText();
        this.cantidadActual = this.textCenterService.TextCenterCursor(this.textCursor);
        // console.log(`cantidad actual = ${this.cantidadActual}`);
        this.filtrarComa();
        this.filtrarSigno();
      });
  }

  isSigno(searchString = ''): boolean {
    return searchString.includes('*') ||
      searchString.includes('/') ||
      searchString.includes('+') ||
      searchString.includes('-') ? true : false;
  }

  igual() {
    this.calcText = this.formatoService.parentisis(this.calcText);
    this.resultado = this.calcService.resolverOperacion(this.calcText);
  }

  invertirNumbero() {
    // no llamar a invertir cuando la cadena sea vacia o
    // o cuando la cadena actual es un signo
    if (this.cantidadActual !== '' &&
      !(this.cantidadActual.length === 1 && this.isSigno(this.cantidadActual)) // 1+|
    ) {
      const posicion = this.invertir();
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
      if (this.isSigno(tecla) && this.signo) { } else {
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
    this.resultado = this.calcService.resolverOperacion(this.calcText);
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

  /**
   * divide la cadena actual en dos cudenas partiendo de
   * la posicion del cursor
   */
  DivideText(): void {
    this.textCursor = {
      start: this.calcText.substr(0, this.posicionCursor),
      end: this.calcText.substr(this.posicionCursor)
    };
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

    this.signo = this.isSigno(star[star.length - 1]) ||
      this.isSigno(end[0]) ?
      true : false;

    // console.log('signo = ' + this.signo);
  }

  /**
   * Devueve la cadena que esta a la izquierda del la cantidad Actual
   * Si la cadena principal fuera 12+2|3+34
   * @example let izquierda = cantidadIzquierda() // 12+
   */
  cantidadIzquierda(): string {
    // texto a la izquierda del curosr
    let cadenaIzquierda = this.textCursor.start;

    /*
      cuando en la pantalla solo hay una cantidad, esta sera la cantidad actual
      y cantidadIzquierda no debera devolver nada ejemplo : -23 = ''.
      para verficar que solo exita una cantidad en pantalla, primero eliminamos el
      primer caracter de la cadena cuando este sea un signo, (-2 = 23) esto se hace asi porque esto
      nos permitira buscar si exite otra aparicon de un signo en el resto de la cadena,
      cuando no se encuentra se considerara que la cantidad escrita en pantalla sera
      la actual (1234)
    */
    // -----------------------------------------------
    let copiaCadena;
    if (!this.isSigno(this.textCursor.end)) {
      if (cadenaIzquierda.startsWith('-') && cadenaIzquierda.length === 1) {
        cadenaIzquierda = '';
      } else
        if (this.isSigno(cadenaIzquierda[0]) && cadenaIzquierda.length > 1) {
          copiaCadena = cadenaIzquierda.substr(1);
        }
    }
    if (copiaCadena) {
      if (!this.isSigno(copiaCadena)) {
        cadenaIzquierda = '';
      }
    } else { // se considera que no se elimino ningun signo al inicio
      if (!this.isSigno(cadenaIzquierda)) {
        cadenaIzquierda = '';
      }
    }
    // --------------------------------------------------

    // verificaremos que la cantidad contenga al menos un signo para asi poder
    // devolver la cadena, si no se encuentra se devolvera una cadena vacia
    // porque se considerara que la cadena que se esta evaluando pertenece a la
    // cantidad actual
    if (this.isSigno(cadenaIzquierda) && cadenaIzquierda) {
      for (let i = cadenaIzquierda.length - 1; i >= 0; i--) {
        const iterator = cadenaIzquierda[i];
        // 1+23+- = 1+23+
        // cuando nos encontramos con el caso de dos signos seguidos por ejemplo "1+23+-" debemos eliminar
        // el ultimo signo ya que ese signo petenece a la cantidad actual
        if (this.isSigno(cadenaIzquierda[cadenaIzquierda.length - 2]) && cadenaIzquierda.endsWith('-')) {
          cadenaIzquierda = cadenaIzquierda.substr(0, cadenaIzquierda.length - 1);
          break;
        } else
          // la cadena se devolvera asta que nos encontremos con la aparcion de un signo
          if (this.isSigno(iterator)) {
            break;
          } else { // 1+23+23 = 1+23+2 ....
            // en cualquier caso si no se encuentra un signo seguiremos eliminando el
            // ultimo carater hasta encontrarse con la aparicion de un signo
            cadenaIzquierda = cadenaIzquierda.substr(0, cadenaIzquierda.length - 1);
          }
      }
    } else {
      cadenaIzquierda = '';
    }
    return cadenaIzquierda;
  }

  /**
   * Devueve la cadena que esta a la derecha del cursor
   * Si la cadena principal fuera 12+2|3+34
   * @example let derecha = cantidadIzquierda() // +34
   */
  CantidadDerecha(): string {
    let cadenaDerecha = this.textCursor.end;

    // 2+|-3+4 = +4
    // cuando se el cursor se encuentra en medio de dos signos;
    // eliminaremos el primer signo, porque se considerara que esta pertenece
    // a la cantidad actual
    if (this.isSigno(this.textCursor.start[this.textCursor.start.length - 1])
      && this.isSigno(this.textCursor.end[0])) {
      cadenaDerecha = cadenaDerecha.substr(this.cantidadActual.length - 1);
    }

    // cuano el cursor se encuentra en la poscion 0 y la cantidad que sigue
    // es un signo, entonces eliminaremos el primer signo
    // porque se considera que esta pertenece a la cantidad actual
    // al eliminar esto signo, nos concentraremos en buscar la siguiente aparicion de un signo
    // y asi devolver la cantidadDerecha
    if (this.textCursor.start === '' && this.isSigno(this.textCursor.end[0])) {
      cadenaDerecha = cadenaDerecha.substr(1);
    }

    // 12+2I5+23 = +23
    if (this.isSigno(cadenaDerecha)) {
      for (const iterator of cadenaDerecha) {
        if (this.isSigno(iterator)) {
          break;
        } else {
          cadenaDerecha = cadenaDerecha.substr(1);
        }
      }
    } else {
      cadenaDerecha = '';
    }
    return cadenaDerecha;
  }

  // convierte positivo a negativo y biseversa la cantidad actual
  invertir() {

    let cantidad: number;
    let newString = this.cantidadActual;


    const cadenaDerecha = this.CantidadDerecha();
    const cadenaIzquierda = this.cantidadIzquierda();
    //   console.log(`cadenaDerecha : ${cadenaDerecha}
    // cadenaIzquierda : ${cadenaIzquierda}`);


    const deleteString = (inicio, length?) => {
      newString = newString.substr(inicio, length);
    };

    // +34I5+ = +34I5
    if (this.isSigno(this.cantidadActual[this.cantidadActual.length - 1])) {
      deleteString(0, this.cantidadActual.length - 1);
    }

    // *232 = 232
    if (this.cantidadActual.startsWith('*') || this.cantidadActual.startsWith('/')) {
      deleteString(1);
    }

    // 123I
    if (!this.isSigno(this.cantidadActual)) {
      newString = this.cantidadActual;
    }

    // conversion a -1
    cantidad = Number(newString) * -1;

    this.calcText = cadenaIzquierda + cantidad + cadenaDerecha;
    // console.log(`iquierda ${cadenaIzquierda} derecha ${cadenaDerecha} cadena ${this.cantidadActual}`);
    return cantidad.toString()[0] === '-' ? 'positivo' : 'negativo';
  }
}
