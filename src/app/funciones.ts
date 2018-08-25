export function isSigno(searchString = ''): boolean {
  return searchString.includes('*') ||
    searchString.includes('/') ||
    searchString.includes('+') ||
    searchString.includes('-') ? true : false;
}

/**verifica que la cadena sea igual a SEN o TAN o COS o SQRT
 * @param tecla cadena a ser verificada
 * @param add cadena que se concatenara con los verificadores ejemplo SEN + add
 */
export function isTrigonometria(tecla: string, add = ''): boolean {
  if (tecla === `SEN${add}` || tecla === `COS${add}` ||
    tecla === `TAN${add}` || tecla === `SQRT${add}` ||
    tecla === `√${add}`) {
    return true;
  } else {
    return false;
  }
}

export function isNumber(txt = ''): boolean {
  const is: boolean = Number.isInteger(+txt);
  return is;
}

export function isConstant(txt = ''): boolean {
  return txt === 'pi' || txt === 'e';
}

/**
 * Devuelve el ultimo elemento de ua cadena
 * @param txt cadena
 */
export function strLast(txt = ''): string {
  return txt.charAt(txt.length - 1);
}
