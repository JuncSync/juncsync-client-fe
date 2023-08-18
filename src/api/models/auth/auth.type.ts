export type AuthPayload = {
  email: string;
  password: string;
};

export type AuthPasswordResetPayload = {
  currentPassword: string;
  resetPassword: string;
};

export type AuthRefreshPayload = {
  refreshToken: string;
};

export type AuthResponse = {
  accessToken: string;
  refreshToken: string;
};
