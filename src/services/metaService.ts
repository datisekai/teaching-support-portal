import {
  apiConfig,
  processMiddlewareSendRequest,
  sendServerRequest,
} from "../apis";

export const metaService = {
  getSingle: async () => {
    const { getSingle } = apiConfig.metadata;
    return processMiddlewareSendRequest({
      ...getSingle,
    });
  },

  update: async (body: Record<string, any>) => {
    const value = JSON.stringify({ value: { ...body } });
    const { update } = apiConfig.metadata;
    return sendServerRequest({
      ...update,
      body: value,
    });
  },
};
