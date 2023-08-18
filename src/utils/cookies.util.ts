export const getCookie = (key: string): string | null => {
  let targetCookie = '';
  const documentCookies = document.cookie?.split('; ') ?? [];

  documentCookies.forEach((documentCookie) => {
    const [k, v] = documentCookie.split('=');
    if (k === key) targetCookie = v;
  });

  return targetCookie !== '' ? targetCookie : null;
};

export const setCookie = (key: string, value: any): void => {
  const addedCookie = `${encodeURIComponent(key)}=${encodeURIComponent(
    value,
  )}; path=/; secure`;

  document.cookie = addedCookie;
};

export const deleteCookie = (key: string): void => {
  const deletedCookie = `${encodeURIComponent(
    key,
  )}=; max-age=-1; path=/; secure`;

  document.cookie = deletedCookie;
};
