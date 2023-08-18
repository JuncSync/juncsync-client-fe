import { HTTP_METHOD } from '@/constants/api';

import { axiosRequester } from '@/api/axios/axiosRequester';

import {
  AuthPasswordResetPayload,
  AuthPayload,
  AuthRefreshPayload,
  AuthResponse,
} from './auth.type';

// 로그인: 계정 로그인
export const postLogin = async (
  payload: AuthPayload,
): Promise<AuthResponse> => {
  const { isOk, data } = await axiosRequester<AuthResponse>({
    method: HTTP_METHOD.POST,
    url: `/auth/login`,
    data: payload,
  });
  return data;
};

// 비밀번호 변경: 유저의 비밀번호를 변경한다
export const putResetPassword = async (
  payload: AuthPasswordResetPayload,
): Promise<boolean> => {
  const { isOk } = await axiosRequester<null>({
    method: HTTP_METHOD.PATCH,
    url: `/users/password-reset`,
    data: payload,
  });
  return isOk;
};

// 유저 조회: 유저인지 조회한다
export const getUserCheck = async () => {
  const { isOk } = await axiosRequester<null>({
    method: HTTP_METHOD.GET,
    url: `/users`,
  });
  return { isOk };
};

// 토큰 리프레시
export const postTokenRefresh = async (payload: AuthRefreshPayload) => {
  const { isOk, data } = await axiosRequester<AuthResponse>({
    method: HTTP_METHOD.POST,
    url: `/auth/refresh`,
    data: payload,
  });
  return { isOk, data };
};
