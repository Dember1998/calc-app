export class Teclas {
  constructor(
    public nombre: string,
    public deshabilitar = false
  ) { }
}

export class Filas {
  Teclas: Teclas[];
  constructor(private fila: string[]) {
    this.Teclas = this.fila.map(tecla => new Teclas(tecla));
  }
}

export class TexCursor {
  start: string;
  end: string;
}

