import {
  apiConfig,
  processMiddlewareSendRequest,
  sendServerRequest,
} from "../apis";

export const AuthService = {
  login: async (code: string, password: string) => {
    const { login } = apiConfig;
    const resp = await sendServerRequest({
      ...login,
      body: {
        code,
        password,
      },
    });
    return resp.data;
  },
};
