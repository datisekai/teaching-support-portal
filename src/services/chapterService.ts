import {
  apiConfig,
  processMiddlewareSendRequest,
  sendServerRequest,
} from "../apis";

export const chapterService = {
  getAll: async (body: object) => {
    console.log("check2: ", body);
    const { getAll } = apiConfig.chapter;
    return processMiddlewareSendRequest({ ...getAll, body });
  },

  create: async (body: Record<string, any>) => {
    const { create } = apiConfig.chapter;
    return sendServerRequest({
      ...create,
      body,
    });
  },

  delete: async (id: number) => {
    const { _delete } = apiConfig.chapter;
    return sendServerRequest({
      ..._delete,
      endpoint: _delete.endpoint.replace(":id", id.toString()),
    });
  },
};
