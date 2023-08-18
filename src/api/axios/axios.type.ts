export type HTTPResponse<T> = {
  isOk: boolean;
  data: T;
  timestamp: number;
};

export type AxiosRequesterReturn<T> = {
  isOk: boolean;
  data: T;
};
