import {
  apiConfig,
  processMiddlewareSendRequest,
  sendServerRequest,
} from "../apis";

export const difficultyService = {
  getAll: async (body: object) => {
    console.log("check2: ", body);
    const { getAll } = apiConfig.difficulty;
    return processMiddlewareSendRequest({ ...getAll, body });
  },

  create: async (body: Record<string, any>) => {
    const { create } = apiConfig.difficulty;
    return sendServerRequest({
      ...create,
      body,
    });
  },

  delete: async (id: number) => {
    const { _delete } = apiConfig.difficulty;
    return sendServerRequest({
      ..._delete,
      endpoint: _delete.endpoint.replace(":id", id.toString()),
    });
  },
};
