import { HTTP_METHOD } from '@/constants/api';
import { COOKIE_ACCESS_TOKEN_KEY } from '@/constants/key';

import { axiosRequester } from '@/api/axios/axiosRequester';

import { getCookie } from '@/utils/cookies.util';

import { ImageUploadResponse } from './common.type';

// 이미지 업로드: 이미지를 업로드한다
export const postImageUpload = async (
  formData: FormData,
): Promise<ImageUploadResponse> => {
  const accessToken = getCookie(COOKIE_ACCESS_TOKEN_KEY);
  const { isOk, data } = await axiosRequester<ImageUploadResponse>({
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    method: HTTP_METHOD.POST,
    url: `/upload/images`,
    data: formData,
  });
  return data;
};
