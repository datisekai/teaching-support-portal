import {
  apiConfig,
  processMiddlewareSendRequest,
  sendServerRequest,
} from "../apis";

export const studentScoreService = {
  getSingle: async (id: string) => {
    const { getSingle } = apiConfig.studentScore;
    return processMiddlewareSendRequest({
      ...getSingle,
      endpoint: getSingle.endpoint.replace(":id", id.toString()),
    });
  },

  update: async (body: Record<string, any>) => {
    const { update } = apiConfig.studentScore;
    return processMiddlewareSendRequest({
      ...update,
      body,
    });
  },
};
