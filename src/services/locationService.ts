import {
  apiConfig,
  processMiddlewareSendRequest,
  sendServerRequest,
} from "../apis";

export const locationService = {
  getAll: async (body: object) => {
    const { getAll } = apiConfig.location;
    return processMiddlewareSendRequest({ ...getAll, body });
  },

  getSingle: async (id: string) => {
    const { getSingle } = apiConfig.location;
    return processMiddlewareSendRequest({
      ...getSingle,
      endpoint: getSingle.endpoint.replace(":id", id.toString()),
    });
  },
  create: async (body: Record<string, any>) => {
    const { create } = apiConfig.location;
    return sendServerRequest({
      ...create,
      body,
    });
  },
  update: async (id: number, body: Record<string, any>) => {
    const { update } = apiConfig.location;
    return sendServerRequest({
      ...update,
      endpoint: update.endpoint.replace(":id", id.toString()),
      body,
    });
  },
  delete: async (id: number) => {
    const { _delete } = apiConfig.location;
    return sendServerRequest({
      ..._delete,
      endpoint: _delete.endpoint.replace(":id", id.toString()),
    });
  },
};
