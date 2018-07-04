import { Injectable } from '@angular/core';
import { isSigno } from '../funciones';
import { CalcService } from './calc.service';
import { TextCenterService, ITexCenter } from './text-center.service';
import { TexCursor } from '../calc-class';
import { TextCursorService } from './text-cursor.service';

@Injectable({
  providedIn: 'root'
})
export class InvertirCantidadService {

  calcText = '';
  textCursor: TexCursor;
  cantidadActual: ITexCenter;
  posicionCursor = 0;

  constructor(
    public calcService: CalcService,
    private textCenterService: TextCenterService,
    private textCursorService: TextCursorService
  ) {

    this.calcService
      .getCalcText$()
      .subscribe(text => this.calcText = text);

    this.calcService
      .getPosicionCursor$()
      .subscribe(posicion => {
        this.posicionCursor = posicion;

        this.textCenterService
          .getTextCenter$()
          .subscribe(text => this.cantidadActual = text);
      });

    this.textCursorService
      .getTextCursor$()
      .subscribe(textCursor => this.textCursor = textCursor);
  }

  // convierte positivo a negativo y biseversa la cantidad actual
  invertir(): string {
 // devuelve  la cantidad actual con el signo a la derecha eliminado
  // ejemplo 123+ = 123
  const deleteSigno = this.eliminarSigno();
  // cantidad actual con sus signos a la izquierda y derecha
  const center = this.cantidadActual;

  // multiplicacion * -1
  let cantidad: string = deleteSigno.derecha;
  cantidad = (Number(cantidad) * -1) + deleteSigno.signoDerecha;

  /* para agregar la cantida que se multiplico *-1 a la cadena principal,
    se crean nuevas copias de la cadena principal y la cadena actual,
     pero agregandole el signo del cursor '|', esto es para que al usar
     el metodo "replace" se puedan hacer cooncidir las cadenas y remplazarla
     por la cantidad que se multiplico por -1
  */
  const newStrActual = center.left + '|' + center.righ;
  let newStrCompleto = this.textCursor.start + '|' + this.textCursor.end;

  newStrCompleto = newStrCompleto
    .replace(
      newStrActual, cantidad
    );

  return newStrCompleto;
  }

/**Elimina el signo de una cantidad actual */
private eliminarSigno() {
  const center = this.cantidadActual.center;
  const tamanio = center.length;
  let derecha = center;
  let signoDerecha = '';

  if (isSigno(derecha[tamanio - 1])) {
    signoDerecha = derecha[tamanio - 1];
    derecha = derecha.substring(0, tamanio - 1);
  }

  return {
    derecha,
    signoDerecha
  };
}


}

