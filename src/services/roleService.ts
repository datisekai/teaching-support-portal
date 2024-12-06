import {
  apiConfig,
  processMiddlewareSendRequest,
  sendServerRequest,
} from "../apis";

export const RoleService = {
  getAll: async (body: object) => {
    const { getAll } = apiConfig.role;
    return processMiddlewareSendRequest({ ...getAll, body });
  },

  getSingle: async (id: number) => {
    const { getSingle } = apiConfig.role;
    return processMiddlewareSendRequest({
      ...getSingle,
      endpoint: getSingle.endpoint.replace(":id", id.toString()),
    });
  },
  updateRolePermissions: async (id: number, permissionIds: number[]) => {
    const { updateRolePermissions } = apiConfig.role;
    return sendServerRequest({
      ...updateRolePermissions,
      endpoint: updateRolePermissions.endpoint.replace(":id", id.toString()),
      body: { permissionIds },
    });
  },
  create: async (body: Record<string, any>) => {
    const { create } = apiConfig.role;
    return sendServerRequest({
      ...create,
      body,
    });
  },
  update: async (id: number, body: Record<string, any>) => {
    const { update } = apiConfig.role;
    return sendServerRequest({
      ...update,
      endpoint: update.endpoint.replace(":id", id.toString()),
      body,
    });
  },
  delete: async (id: number) => {
    const { _delete } = apiConfig.role;
    return sendServerRequest({
      ..._delete,
      endpoint: _delete.endpoint.replace(":id", id.toString()),
    });
  },
};
