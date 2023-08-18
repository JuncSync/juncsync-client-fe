import { queryKeys } from '@/react-query/queryKeys';
import { useMutation } from '@tanstack/react-query';

import { postImageUpload } from '@/api/models/common/common.api';

export const usePostImageUploadMutation = () => {
  const { mutate, isLoading, isSuccess, isError } = useMutation(
    [queryKeys.PostImageUpload],
    postImageUpload,
  );

  return { mutate, isLoading, isSuccess, isError };
};
