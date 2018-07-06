import { isSigno } from '../funciones';

abstract class EliminarSigno {
  constructor(public cantidad = '') {
    this.cntCantidad = cantidad.length - 1;
    this.eliminarSigno();
  }
  signo = '';
  cntCantidad: number;
  protected eliminarSigno() { }
}

export class EliminarSignoDerecha extends EliminarSigno {
  constructor(public txt = '') {
    super(txt);
  }

  protected eliminarSigno() {
    if (isSigno(this.cantidad.charAt(this.cntCantidad))) {
      this.signo = this.cantidad.charAt(this.cntCantidad);
      this.cantidad = this.cantidad.substring(0, this.cntCantidad);
    }
  }
}

export class EliminarSignoIzquieda extends EliminarSigno {
  constructor(public txt = '') {
    super(txt);
  }

  protected eliminarSigno() {
    if (isSigno(this.cantidad.charAt(0))) {
      if (this.cantidad.charAt(0) === '+') {
        this.signo = this.cantidad.charAt(0);
        this.cantidad = this.cantidad.substring(1);
      }
    }
  }
}
