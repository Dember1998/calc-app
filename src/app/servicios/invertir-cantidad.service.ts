import { Injectable } from '@angular/core';
import { isSigno } from '../funciones';
import { CalcService } from './calc.service';
import { TextCenterService } from './text-center.service';
import { TexCursor } from '../calc-class';

@Injectable({
  providedIn: 'root'
})
export class InvertirCantidadService {

  calcText = '';
  textCursor: TexCursor;
  cantidadActual: string;
  posicionCursor = 0;

  constructor(
    public calcService: CalcService,
    private textCenterService: TextCenterService,
  ) {

    this.calcService.getCalcText$()
      .subscribe(text => this.calcText = text);

    this.calcService.getPosicionCursor$()
      .subscribe(posicion => {
        this.posicionCursor = posicion;
        this.DivideText();
        this.cantidadActual = this.textCenterService.TextCenterCursor(this.textCursor);
      });
  }

  DivideText() {
    this.textCursor = {
      start: this.calcText.substr(0, this.posicionCursor),
      end: this.calcText.substr(this.posicionCursor)
    };
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
    if (!isSigno(this.textCursor.end)) {
      if (cadenaIzquierda.startsWith('-') && cadenaIzquierda.length === 1) {
        cadenaIzquierda = '';
      } else
        if (isSigno(cadenaIzquierda[0]) && cadenaIzquierda.length > 1) {
          copiaCadena = cadenaIzquierda.substr(1);
        }
    }
    if (copiaCadena) {
      if (!isSigno(copiaCadena)) {
        cadenaIzquierda = '';
      }
    } else { // se considera que no se elimino ningun signo al inicio
      if (!isSigno(cadenaIzquierda)) {
        cadenaIzquierda = '';
      }
    }
    // --------------------------------------------------

    // verificaremos que la cantidad contenga al menos un signo para asi poder
    // devolver la cadena, si no se encuentra se devolvera una cadena vacia
    // porque se considerara que la cadena que se esta evaluando pertenece a la
    // cantidad actual
    if (isSigno(cadenaIzquierda) && cadenaIzquierda) {
      for (let i = cadenaIzquierda.length - 1; i >= 0; i--) {
        const iterator = cadenaIzquierda[i];
        // 1+23+- = 1+23+
        // cuando nos encontramos con el caso de dos signos seguidos por ejemplo "1+23+-" debemos eliminar
        // el ultimo signo ya que ese signo petenece a la cantidad actual
        if (isSigno(cadenaIzquierda[cadenaIzquierda.length - 2]) && cadenaIzquierda.endsWith('-')) {
          cadenaIzquierda = cadenaIzquierda.substr(0, cadenaIzquierda.length - 1);
          break;
        } else
          // la cadena se devolvera asta que nos encontremos con la aparcion de un signo
          if (isSigno(iterator)) {
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
    if (isSigno(this.textCursor.start[this.textCursor.start.length - 1])
      && isSigno(this.textCursor.end[0])) {
      cadenaDerecha = cadenaDerecha.substr(this.cantidadActual.length - 1);
    }

    // cuano el cursor se encuentra en la poscion 0 y la cantidad que sigue
    // es un signo, entonces eliminaremos el primer signo
    // porque se considera que esta pertenece a la cantidad actual
    // al eliminar esto signo, nos concentraremos en buscar la siguiente aparicion de un signo
    // y asi devolver la cantidadDerecha
    if (this.textCursor.start === '' && isSigno(this.textCursor.end[0])) {
      cadenaDerecha = cadenaDerecha.substr(1);
    }

    // 12+2I5+23 = +23
    if (isSigno(cadenaDerecha)) {
      for (const iterator of cadenaDerecha) {
        if (isSigno(iterator)) {
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
  invertir(): string {

    let calcText = '';
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
    if (isSigno(this.cantidadActual[this.cantidadActual.length - 1])) {
      deleteString(0, this.cantidadActual.length - 1);
    }

    // *232 = 232
    if (this.cantidadActual.startsWith('*') || this.cantidadActual.startsWith('/')) {
      deleteString(1);
    }

    // 123I
    if (!isSigno(this.cantidadActual)) {
      newString = this.cantidadActual;
    }

    // conversion a -1
    cantidad = Number(newString) * -1;

    calcText = cadenaIzquierda + cantidad + cadenaDerecha;
    // console.log(`iquierda ${cadenaIzquierda} derecha ${cadenaDerecha} cadena ${this.cantidadActual}`);
    return calcText;
  }
}
