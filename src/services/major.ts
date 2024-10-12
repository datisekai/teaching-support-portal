import {
  apiConfig,
  processMiddlewareSendRequest,
  sendServerRequest,
} from "../apis";

export const majorService = {
  getAll: async (body: object) => {
    const { getAll } = apiConfig.major;
    return processMiddlewareSendRequest({ ...getAll, body });
  },

  getSingle: async (id: string) => {
    const { getSingle } = apiConfig.major;
    return processMiddlewareSendRequest({
      ...getSingle,
      endpoint: getSingle.endpoint.replace(":id", id.toString()),
    });
  },
  create: async (body: Record<string, any>) => {
    const { create } = apiConfig.major;
    return sendServerRequest({
      ...create,
      body,
    });
  },
  update: async (id: number, body: Record<string, any>) => {
    const { update } = apiConfig.major;
    return sendServerRequest({
      ...update,
      endpoint: update.endpoint.replace(":id", id.toString()),
      body,
    });
  },
  delete: async (id: number) => {
    const { _delete } = apiConfig.major;
    return sendServerRequest({
      ..._delete,
      endpoint: _delete.endpoint.replace(":id", id.toString()),
    });
  },
};
