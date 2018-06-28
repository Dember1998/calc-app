export function isSigno(searchString = ''): boolean {
  return searchString.includes('*') ||
    searchString.includes('/') ||
    searchString.includes('+') ||
    searchString.includes('-') ? true : false;
}
