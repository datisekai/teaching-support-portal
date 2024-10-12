import {
  apiConfig,
  processMiddlewareSendRequest,
  sendServerRequest,
} from "../apis";

export const permissionService = {
  getAll: async (body = {}) => {
    const { getAll } = apiConfig.permission;
    return processMiddlewareSendRequest({ ...getAll, body });
  },
  getSingle: async (id: number) => {
    const { getSingle } = apiConfig.permission;
    return processMiddlewareSendRequest({
      ...getSingle,
      endpoint: getSingle.endpoint.replace(":id", id.toString()),
    });
  },
  create: async (body: Record<string, any>) => {
    const { create } = apiConfig.permission;
    return sendServerRequest({
      ...create,
      body,
    });
  },
  update: async (id: number, body: Record<string, any>) => {
    const { update } = apiConfig.permission;
    return sendServerRequest({
      ...update,
      endpoint: update.endpoint.replace(":id", id.toString()),
      body,
    });
  },
  delete: async (id: number) => {
    const { _delete } = apiConfig.permission;
    return sendServerRequest({
      ..._delete,
      endpoint: _delete.endpoint.replace(":id", id.toString()),
    });
  },
};
