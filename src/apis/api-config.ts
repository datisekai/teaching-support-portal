interface IApiConfig {
  [key: string]: {
    method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
    endpoint: string;
  };
}

export const apiConfig: IApiConfig = {
  upload: {
    method: "POST",
    endpoint: "/api.upload",
  },
};
