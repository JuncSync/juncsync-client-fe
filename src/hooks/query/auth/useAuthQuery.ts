import { queryKeys } from '@/react-query/queryKeys';
import { useQuery } from '@tanstack/react-query';

import { getUserCheck } from '@/api/models/auth/auth.api';

export const useAdminUserCheckQuery = () => {
  const { data, isLoading, isSuccess, isError, isFetching, isFetched } =
    useQuery([queryKeys.GetUserCheck], getUserCheck);

  return { data, isLoading, isSuccess, isError, isFetching, isFetched };
};
