import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

import { COOKIE_ACCESS_TOKEN_KEY } from '@/constants/key';

import { getCookie } from '@/utils/cookies.util';

import { AxiosRequesterReturn, HTTPResponse } from './axios.type';
import { axiosInstance } from './axiosInstance';

export const axiosRequester = async <Payload>(
  config: AxiosRequestConfig,
): Promise<AxiosRequesterReturn<Payload>> => {
  const accessToken = getCookie(COOKIE_ACCESS_TOKEN_KEY);

  const response: AxiosResponse<HTTPResponse<Payload>> = await axiosInstance({
    headers: {
      Authorization: accessToken ? `Bearer ${accessToken}` : '',
    },
    ...config,
  });

  if (response instanceof AxiosError) {
    throw new AxiosError(response.response?.data.data);
  }

  const { isOk, data } = response.data;

  return {
    isOk,
    data,
  };
};
