import {
  apiConfig,
  processMiddlewareSendRequest,
  sendServerRequest,
} from "../apis";

export const AuthService = {
  login: async (code: string, password: string) => {
    const { login } = apiConfig;
    const resp = await processMiddlewareSendRequest({
      ...login,
      body: {
        code,
        password,
      },
    });
    return resp.data;
  },
};
