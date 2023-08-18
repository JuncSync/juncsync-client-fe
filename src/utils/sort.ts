type SortCompareFn = (
  a: Record<string, string | number>,
  b: Record<string, string | number>,
  filterKey: string,
) => number;

export const dateCompareFunction: SortCompareFn = (a, b, filterKey) => {
  return new Date(a[filterKey]).getTime() - new Date(b[filterKey]).getTime();
};

export const numberCompareFunction: SortCompareFn = (a, b, filterKey) => {
  return Number(b[filterKey]) - Number(a[filterKey]);
};
