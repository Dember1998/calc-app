import { isSigno } from '../funciones';

export class PosicionSigno {
  constructor(private text = '') { }

  // devuleve true si se hiso una validacion
  private validar(): boolean {
      if (this.text === '') {
          return true;
      }

      if (isSigno(this.text) === false) {
          return true;
      }

      return false;
  }

  public get Ultimo() {
      if (this.validar()) { return - 1; }

      let posicion;
      posicion = Array
          .from(this.text)
          .reverse()
          .findIndex(val => isSigno(this.text));

      return (this.text.length - 1) - posicion;
  }

  public get Primer() {
      if (this.validar()) { return - 1; }

      const posicion = Array
          .from(this.text)
          .findIndex(val => isSigno(val)) + 1;

      return posicion;
  }
}
