export const getCapitalizedString = (str: string): string => {
  str = str.toLowerCase();
  const capitalizedStr = str.charAt(0).toUpperCase() + str.slice(1);
  return capitalizedStr;
};
