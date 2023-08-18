export const isEmptyExistObject = (obj: object): boolean =>
  Object.keys(obj).length === 0 && obj.constructor === Object;
