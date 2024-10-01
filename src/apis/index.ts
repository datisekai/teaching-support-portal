export * from "./api-config";

import { axiosInstance } from "../plugins/axios";

export const sendServerRequest = async ({
  endpoint = "",
  method = "",
  body = {},
}) => {
  try {
    const resp = await axiosInstance.request({
      url: endpoint,
      method,
      ...{
        [method === "get" ? "params" : "data"]: body,
      },
    });

    if (!resp.data) throw resp;
    return resp.data;
  } catch (error) {
    throw error;
  }
};
type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
interface SendFormDataParams {
  endpoint: string;
  method: HttpMethod;
  body: FormData | Record<string, any>;
}
export const sendFormData = async ({
  endpoint = "",
  method = "POST",
  body,
}: SendFormDataParams) => {
  try {
    const resp = await axiosInstance.request({
      url: endpoint,
      method,
      data: body,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (!resp.data) throw resp;
    return resp.data;
  } catch (error) {
    throw error;
  }
};
