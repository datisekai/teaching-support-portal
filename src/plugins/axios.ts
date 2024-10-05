import axios from "axios";
import { BASE_URL, localKey, pathNames } from "../constants";
import { getObjectLocalData, removeLocalItem } from "../utils";

export const axiosInstance = axios.create({
  withCredentials: false,
  baseURL: BASE_URL,
  headers: {
    "content-type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (conf) => {
    const token = getObjectLocalData(localKey.TOKEN);
    if (token) {
      conf.headers.Authorization = `Bearer ${token}`;
    }
    return conf;
  },
  (error) => {
    Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      // removeLocalItem(localKey.TOKEN);
      // window.location.replace(pathNames.HOME);
      return;
    }
    return error.response?.data;
  }
);
