import { isEmptyExistObject } from './objectValid.util';

export const getQueryString = (qs: object): string =>
  isEmptyExistObject(qs) ? '' : `?${new URLSearchParams({ ...qs }).toString()}`;
