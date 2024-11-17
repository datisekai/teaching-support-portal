import {
  apiConfig,
  processMiddlewareSendRequest,
  sendServerRequest,
} from "../apis";

export const majorService = {
  getAll: async (body: object) => {
    const { getAll } = apiConfig.major;
    return processMiddlewareSendRequest({ ...getAll, body });
  },

  updateAssignTeachers: async (id: number, body: Record<string, any>) => {
    const { updateAssignTeachers } = apiConfig.major;
    return sendServerRequest({
      ...updateAssignTeachers,
      endpoint: updateAssignTeachers.endpoint.replace(":id", id.toString()),
      body,
    });
  },
  deleteTeachersMajor: async (id: number, teacherCode: number) => {
    const { deleteTeachersMajor } = apiConfig.major;
    return sendServerRequest({
      ...deleteTeachersMajor,
      endpoint: deleteTeachersMajor.endpoint
        .replace(":id", id.toString())
        .replace(":teacherCode", teacherCode.toString()),
    });
  },
  getSingle: async (id: string) => {
    const { getSingle } = apiConfig.major;
    return processMiddlewareSendRequest({
      ...getSingle,
      endpoint: getSingle.endpoint.replace(":id", id.toString()),
    });
  },
  create: async (body: Record<string, any>) => {
    const { create } = apiConfig.major;
    return sendServerRequest({
      ...create,
      body,
    });
  },
  update: async (id: number, body: Record<string, any>) => {
    const { update } = apiConfig.major;
    return sendServerRequest({
      ...update,
      endpoint: update.endpoint.replace(":id", id.toString()),
      body,
    });
  },
  delete: async (id: number) => {
    const { _delete } = apiConfig.major;
    return sendServerRequest({
      ..._delete,
      endpoint: _delete.endpoint.replace(":id", id.toString()),
    });
  },
  importMajor: async (body: Record<string, any>) => {
    const { importMajor } = apiConfig.major;
    return sendServerRequest({
      ...importMajor,
      body,
    });
  },
};
