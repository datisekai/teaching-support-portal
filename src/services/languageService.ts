import { apiConfig, sendServerRequest } from "../apis";

export const languageService = {
  getAll: () => {
    return sendServerRequest({
      ...apiConfig.language.getAll,
    });
  },
};
