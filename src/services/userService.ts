import {
  apiConfig,
  processMiddlewareSendRequest,
  sendServerRequest,
} from "../apis";

export const UserService = {
  getMe: async () => {
    const { getMe } = apiConfig;
    return processMiddlewareSendRequest(getMe);
  },
  update: async (id: number) => {
    const { updateUser } = apiConfig;
    return sendServerRequest({
      ...updateUser,
      endpoint: updateUser.endpoint.replace("id", id.toString()),
      body: {},
    });
  },
};
