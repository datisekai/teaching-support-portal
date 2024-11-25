import { get } from "react-hook-form";
import {
  apiConfig,
  processMiddlewareSendRequest,
  sendServerRequest,
} from "../apis";
import { UserType } from "../constants";
import { useUserStore } from "../stores/userStore";

export const attendanceService = {
  getAll: async (body: object) => {
    console.log("check2: ", body);
    const { getAll } = apiConfig.attendance;
    return processMiddlewareSendRequest({ ...getAll, body });
  },
  getAttendees: async (id: number, body: object) => {
    const { getAttendees } = apiConfig.attendance;
    return processMiddlewareSendRequest({
      ...getAttendees,
      endpoint: getAttendees.endpoint.replace(":id", id.toString()),
      body,
    });
  },
  getSingle: async (id: string) => {
    const { getSingle } = apiConfig.attendance;
    return processMiddlewareSendRequest({
      ...getSingle,
      endpoint: getSingle.endpoint.replace(":id", id.toString()),
    });
  },
  create: async (body: Record<string, any>) => {
    const { create } = apiConfig.attendance;
    return sendServerRequest({
      ...create,
      body,
    });
  },
  update: async (id: number, body: Record<string, any>) => {
    const { update } = apiConfig.attendance;
    return sendServerRequest({
      ...update,
      endpoint: update.endpoint.replace(":id", id.toString()),
      body,
    });
  },
  delete: async (id: number) => {
    const { _delete } = apiConfig.attendance;
    return sendServerRequest({
      ..._delete,
      endpoint: _delete.endpoint.replace(":id", id.toString()),
    });
  },
  getAttendanceStatistic: async (id: string, body: object) => {
    const { getAttendanceStatistic } = apiConfig.attendance;
    return processMiddlewareSendRequest({
      ...getAttendanceStatistic,
      body,
      endpoint: getAttendanceStatistic.endpoint.replace(":id", id.toString()),
    });
  },
  toggleAttendee: async (id: number, userId: number) => {
    const { toggleAttendee } = apiConfig.attendance;
    return processMiddlewareSendRequest({
      ...toggleAttendee,
      endpoint: toggleAttendee.endpoint
        .replace(":id", id.toString())
        .replace(":userId", userId.toString()),
      body: {},
    });
  },
};
