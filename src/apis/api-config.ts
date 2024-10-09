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
};
