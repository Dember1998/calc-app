export function isSigno(searchString = ''): boolean {
  return searchString.includes('*') ||
    searchString.includes('/') ||
    searchString.includes('+') ||
    searchString.includes('-') ? true : false;
}

export function isTrigonometria(tecla: string): boolean {
  if (tecla === 'SEN' || tecla === 'COS' ||
    tecla === 'TAN' || tecla === 'SQRT') {
    return true;
  } else {
    return false;
  }
}

export function isNumber(txt = ''): boolean {
  const is: boolean = Number.isInteger(+txt);
  return is;
}
