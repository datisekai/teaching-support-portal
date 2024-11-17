import {
  apiConfig,
  processMiddlewareSendRequest,
  sendServerRequest,
} from "../apis";

export const classService = {
  getAll: async (body: object) => {
    console.log("check2: ", body);
    const { getAll } = apiConfig.class;
    return processMiddlewareSendRequest({ ...getAll, body });
  },

  getSingle: async (id: string) => {
    const { getSingle } = apiConfig.class;
    return processMiddlewareSendRequest({
      ...getSingle,
      endpoint: getSingle.endpoint.replace(":id", id.toString()),
    });
  },
  create: async (body: Record<string, any>) => {
    const { create } = apiConfig.class;
    return sendServerRequest({
      ...create,
      body,
    });
  },
  update: async (id: number, body: Record<string, any>) => {
    const { update } = apiConfig.class;
    return sendServerRequest({
      ...update,
      endpoint: update.endpoint.replace(":id", id.toString()),
      body,
    });
  },
  updateAssignTeachers: async (id: number, body: Record<string, any>) => {
    const { updateAssignTeachers } = apiConfig.class;
    return sendServerRequest({
      ...updateAssignTeachers,
      endpoint: updateAssignTeachers.endpoint.replace(":id", id.toString()),
      body,
    });
  },
  delete: async (id: number) => {
    const { _delete } = apiConfig.class;
    return sendServerRequest({
      ..._delete,
      endpoint: _delete.endpoint.replace(":id", id.toString()),
    });
  },
  getStudentClass: async (id: string, body: object) => {
    const { getStudentClass } = apiConfig.class;
    return sendServerRequest({
      ...getStudentClass,
      endpoint: getStudentClass.endpoint.replace(":id", id.toString()),
      body,
    });
  },
  importUsers: async (id: string, body: any) => {
    const { importUser } = apiConfig.class;
    return sendServerRequest({
      ...importUser,
      endpoint: importUser.endpoint.replace(":id", id.toString()),
      body,
    });
  },
  createStudentClass: async (id: string, body: Record<string, any>) => {
    const { createStudentClass } = apiConfig.class;
    return sendServerRequest({
      ...createStudentClass,
      endpoint: createStudentClass.endpoint.replace(":id", id.toString()),
      body,
    });
  },
  deleteStudentClass: async (classId: string, studentCode: string) => {
    const { deleteStudentClass } = apiConfig.class;
    return sendServerRequest({
      ...deleteStudentClass,
      endpoint: deleteStudentClass.endpoint
        .replace(":studentCode", studentCode.toString())
        .replace(":classId", classId.toString()),
    });
  },
  importClass: async (body: any) => {
    const { importClass } = apiConfig.class;
    return sendServerRequest({
      ...importClass,
      body,
    });
  },
};
