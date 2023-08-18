export const getNumberFormat = (num: number): string =>
  new Intl.NumberFormat('ko-kr').format(num);
