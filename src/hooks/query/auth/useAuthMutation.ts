import { queryKeys } from '@/react-query/queryKeys';
import { useMutation } from '@tanstack/react-query';

import { postLogin, postTokenRefresh } from '@/api/models/auth/auth.api';

export const usePostAdminLoginMutation = () => {
  const { mutate, isLoading, isSuccess, isError } = useMutation(
    [queryKeys.PostLogin],
    postLogin,
  );

  return { mutate, isLoading, isSuccess, isError };
};

export const usePostTokenRefreshMutation = () => {
  const { mutate, isLoading, isSuccess, isError } = useMutation(
    [queryKeys.PostTokenRefresh],
    postTokenRefresh,
  );

  return { mutate, isLoading, isSuccess, isError };
};
