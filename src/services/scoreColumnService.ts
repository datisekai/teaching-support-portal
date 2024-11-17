import {
  apiConfig,
  processMiddlewareSendRequest,
  sendServerRequest,
} from "../apis";

export const scoreColumnService = {
  getSingle: async (id: string) => {
    const { getSingle } = apiConfig.scoreColumn;
    return processMiddlewareSendRequest({
      ...getSingle,
      endpoint: getSingle.endpoint.replace(":id", id.toString()),
    });
  },

  update: async (body: Record<string, any>) => {
    const { update } = apiConfig.scoreColumn;
    return sendServerRequest({
      ...update,
      body,
    });
  },
  createMultiple: async (body: Record<string, any>) => {
    const { createMultiple } = apiConfig.scoreColumn;
    return sendServerRequest({
      ...createMultiple,
      body,
    });
  },
  delete: async (id: string) => {
    const { _delete } = apiConfig.scoreColumn;
    return sendServerRequest({
      ..._delete,
      endpoint: _delete.endpoint.replace(":id", id.toString()),
    });
  },
  getSingleClass: async (id: string) => {
    const { getSingleClass } = apiConfig.scoreColumn;
    return processMiddlewareSendRequest({
      ...getSingleClass,
      endpoint: getSingleClass.endpoint.replace(":id", id.toString()),
    });
  },
};
