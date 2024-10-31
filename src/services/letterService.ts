import {
  apiConfig,
  processMiddlewareSendRequest,
  sendServerRequest,
} from "../apis";

export const letterService = {
  getAll: async (body: object) => {
    const { getAll } = apiConfig.letter;
    return processMiddlewareSendRequest({ ...getAll, body });
  },

  getSingle: async (id: string) => {
    const { getSingle } = apiConfig.letter;
    return processMiddlewareSendRequest({
      ...getSingle,
      endpoint: getSingle.endpoint.replace(":id", id.toString()),
    });
  },
  create: async (body: Record<string, any>) => {
    const { create } = apiConfig.letter;
    return sendServerRequest({
      ...create,
      body,
    });
  },
  update: async (id: number, body: Record<string, any>) => {
    const { update } = apiConfig.letter;
    return sendServerRequest({
      ...update,
      endpoint: update.endpoint.replace(":id", id.toString()),
      body,
    });
  },
  updateStatus: async (id: number, body: Record<string, any>) => {
    const { updateStatus } = apiConfig.letter;
    return sendServerRequest({
      ...updateStatus,
      endpoint: updateStatus.endpoint.replace(":id", id.toString()),
      body,
    });
  },
};
