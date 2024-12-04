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
  getAll: async (body: object) => {
    const { getAll } = apiConfig.user;
    return processMiddlewareSendRequest({ ...getAll, body });
  },

  getSingle: async (id: string) => {
    const { getSingle } = apiConfig.user;
    return processMiddlewareSendRequest({
      ...getSingle,
      endpoint: getSingle.endpoint.replace(":id", id.toString()),
    });
  },
  create: async (body: Record<string, any>) => {
    const { create } = apiConfig.user;
    return sendServerRequest({
      ...create,
      body,
    });
  },
  update: async (id: number, body: Record<string, any>) => {
    const { update } = apiConfig.user;
    return sendServerRequest({
      ...update,
      endpoint: update.endpoint.replace(":id", id.toString()),
      body,
    });
  },
  delete: async (id: number) => {
    const { _delete } = apiConfig.user;
    return sendServerRequest({
      ..._delete,
      endpoint: _delete.endpoint.replace(":id", id.toString()),
    });
  },
  resetDevice: async (id: number) => {
    const { resetDevice } = apiConfig.user;
    return sendServerRequest({
      ...resetDevice,
      endpoint: resetDevice.endpoint.replace(":id", id.toString()),
    });
  },
  getStatistics: async () => {
    const { statistic } = apiConfig;
    return processMiddlewareSendRequest(statistic);
  },
};
