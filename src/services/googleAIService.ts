import {
  apiConfig,
  processMiddlewareSendRequest,
  sendServerRequest,
} from "../apis";

export const googleAIService = {
  generateCode: (language: string, input: string) => {
    return processMiddlewareSendRequest({
      ...apiConfig.googleAI.generateCode,
      body: {
        language,
        input,
      },
    });
  },
};
