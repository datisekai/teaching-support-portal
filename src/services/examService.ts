import {
  apiConfig,
  processMiddlewareSendRequest,
  sendServerRequest,
} from "../apis";

export const examService = {
  getAll: async (body: object) => {
    console.log("check2: ", body);
    const { getAll } = apiConfig.exam;
    return processMiddlewareSendRequest({ ...getAll, body });
  },

  getSingle: async (id: string) => {
    const { getSingle } = apiConfig.exam;
    return processMiddlewareSendRequest({
      ...getSingle,
      endpoint: getSingle.endpoint.replace(":id", id.toString()),
    });
  },
  create: async (body: Record<string, any>) => {
    const { create } = apiConfig.exam;
    return sendServerRequest({
      ...create,
      body,
    });
  },
  update: async (id: number, body: Record<string, any>) => {
    const { update } = apiConfig.exam;
    return sendServerRequest({
      ...update,
      endpoint: update.endpoint.replace(":id", id.toString()),
      body,
    });
  },
  delete: async (id: number) => {
    const { _delete } = apiConfig.exam;
    return sendServerRequest({
      ..._delete,
      endpoint: _delete.endpoint.replace(":id", id.toString()),
    });
  },
  getHistory: async (id: string) => {
    const { getHistory } = apiConfig.exam;
    return processMiddlewareSendRequest({
      ...getHistory,
      endpoint: getHistory.endpoint.replace(":id", id.toString()),
    });
  },
};