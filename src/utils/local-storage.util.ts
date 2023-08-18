export const getLocalStorageItem = (key: string): string | null => {
  const item = window.localStorage.getItem(key);
  return item;
};

export const setLocalStorageItem = (key: string, value: string): void => {
  window.localStorage.setItem(key, JSON.stringify(value));
};
