import axios, { AxiosInstance } from 'axios';

import { BASE_API_URL, RESPONSE_ERROR } from '@/constants/api';
import {
  COOKIE_ACCESS_TOKEN_KEY,
  COOKIE_REFRESH_TOKEN_KEY,
} from '@/constants/key';

import { deleteCookie, getCookie, setCookie } from '@/utils/cookies.util';

import { postTokenRefresh } from '../models/auth/auth.api';

const createAxiosInstance = (): AxiosInstance => {
  const base = axios.create({
    baseURL: BASE_API_URL,
  });

  return base;
};

export const axiosInstance = createAxiosInstance();

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const {
      config,
      response: { status },
    } = error;

    if (status === RESPONSE_ERROR.UNAUTHORIZED) {
      const refreshToken = getCookie(COOKIE_REFRESH_TOKEN_KEY) ?? '';

      const { isOk, data } = await postTokenRefresh({
        refreshToken,
      });

      if (!isOk) {
        alert('로그아웃 되었습니다.');
        deleteCookie(COOKIE_ACCESS_TOKEN_KEY);
        deleteCookie(COOKIE_REFRESH_TOKEN_KEY);
        window.location.href = '/login';
        return await Promise.resolve('refresh response 에러');
      }

      const newAccessToken = data.accessToken;
      setCookie(COOKIE_ACCESS_TOKEN_KEY, newAccessToken);

      // if (!newAccessToken) {
      //   return await Promise.resolve(error.message);
      // }

      config.headers.Authorization = `Bearer ${newAccessToken}`;
      return await axiosInstance(config);
    }

    return await Promise.resolve(error);
  },
);
