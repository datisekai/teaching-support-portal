export const apiConfig = {
  uploadImage: {
    method: "POST",
    endpoint: "/api.upload/image",
  },
  login: {
    method: "POST",
    endpoint: "/api.auth/login-teacher",
  },
  getMe: {
    method: "GET",
    endpoint: "/api.auth/profile",
  },
  updateUser: {
    method: "PUT",
    endpoint: "/api.user/:id",
  },
  // Permission
  permission: {
    create: {
      method: "POST",
      endpoint: "/api.permission",
    },
    update: {
      method: "PUT",
      endpoint: "/api.permission/:id",
    },
    _delete: {
      method: "DELETE",
      endpoint: "/api.permission/:id",
    },
    getAll: {
      method: "GET",
      endpoint: "/api.permission",
    },
    getSingle: {
      method: "GET",
      endpoint: "/api.permission/:id",
    },
  }, // Role
  role: {
    create: {
      method: "POST",
      endpoint: "/api.role",
    },
    update: {
      method: "PUT",
      endpoint: "/api.role/:id",
    },
    _delete: {
      method: "DELETE",
      endpoint: "/api.role/:id",
    },
    getAll: {
      method: "GET",
      endpoint: "/api.role",
    },
    getSingle: {
      method: "GET",
      endpoint: "/api.role/:id",
    },
    updateRolePermissions: {
      method: "PUT",
      endpoint: "/api.role/:id/permissions",
    },
  },
};
