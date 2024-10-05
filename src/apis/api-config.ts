export const apiConfig = {
  upload: {
    method: "POST",
    endpoint: "/api.upload",
  },
  login: {
    method: "POST",
    endpoint: "/api.auth/login-teacher",
  },
  getMe: {
    method: "GET",
    endpoint: "/api.auth/profile",
  },
};
