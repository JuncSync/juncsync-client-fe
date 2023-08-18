export type PaginationResponse = {
  currentPage: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  totalPage: number;
  totalCount: number;
};

export type ImageUploadResponse = {
  link: string;
  filename: string;
};

export type PageQueryStrings = {
  page: string;
  s?: string;
  perPage?: string;
};
