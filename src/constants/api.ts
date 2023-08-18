export const BASE_API_URL = import.meta.env.VITE_MKM_DOMAIN ?? '';

export const HTTP_METHOD = {
  GET: 'GET',
  PUT: 'PUT',
  PATCH: 'PATCH',
  POST: 'POST',
  DELETE: 'DELETE',
} as const;

export const RESPONSE_ERROR = {
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  INTERNAL_SERVER: 500,
} as const;
