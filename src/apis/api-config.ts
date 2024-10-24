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
  },
  // Faculty
  faculty: {
    create: {
      method: "POST",
      endpoint: "/api.faculty",
    },
    update: {
      method: "PUT",
      endpoint: "/api.faculty/:id",
    },
    _delete: {
      method: "DELETE",
      endpoint: "/api.faculty/:id",
    },
    getAll: {
      method: "GET",
      endpoint: "/api.faculty",
    },
    getSingle: {
      method: "GET",
      endpoint: "/api.faculty/:id",
    },
  },
  // Major
  major: {
    create: {
      method: "POST",
      endpoint: "/api.major",
    },
    update: {
      method: "PATCH",
      endpoint: "/api.major/:id",
    },
    _delete: {
      method: "DELETE",
      endpoint: "/api.major/:id",
    },
    getAll: {
      method: "GET",
      endpoint: "/api.major",
    },
    getSingle: {
      method: "GET",
      endpoint: "/api.major/:id",
    },
    updateAssignTeachers: {
      method: "POST",
      endpoint: "/api.major/:id/assign-teachers",
    },
    deleteTeachersMajor: {
      method: "DELETE",
      endpoint: "/api.major/:id/teacher/:teacherCode",
    },
  },
  // Class
  class: {
    create: {
      method: "POST",
      endpoint: "/api.class",
    },
    update: {
      method: "PATCH",
      endpoint: "/api.class/:id",
    },
    _delete: {
      method: "DELETE",
      endpoint: "/api.class/:id",
    },
    getAll: {
      method: "GET",
      endpoint: "/api.class",
    },
    getAllOwn: {
      method: "GET",
      endpoint: "/api.class/me",
    },
    getSingle: {
      method: "GET",
      endpoint: "/api.class/:id",
    },
    updateAssignTeachers: {
      method: "PATCH",
      endpoint: "/api.class/:id/assign-teachers",
    },
  },
  // User
  user: {
    create: {
      method: "POST",
      endpoint: "/api.user",
    },
    update: {
      method: "PUT",
      endpoint: "/api.user/:id",
    },
    _delete: {
      method: "DELETE",
      endpoint: "/api.user/:id",
    },
    getAll: {
      method: "GET",
      endpoint: "/api.user",
    },
    getSingle: {
      method: "GET",
      endpoint: "/api.user/:id",
    },
  },
  // Notification
  notification: {
    create: {
      method: "POST",
      endpoint: "/api.notification",
    },
    update: {
      method: "PATCH",
      endpoint: "/api.notification/:id",
    },
    _delete: {
      method: "DELETE",
      endpoint: "/api.notification/:id",
    },
    getAll: {
      method: "GET",
      endpoint: "/api.notification",
    },
    getSingle: {
      method: "GET",
      endpoint: "/api.notification/:id",
    },
  },
  // Role
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
  attendance: {
    create: {
      method: "POST",
      endpoint: "/api.attendance",
    },
    update: {
      method: "PUT",
      endpoint: "/api.attendance/:id",
    },
    _delete: {
      method: "DELETE",
      endpoint: "/api.attendance/:id",
    },
    getAll: {
      method: "GET",
      endpoint: "/api.attendance",
    },
    getSingle: {
      method: "GET",
      endpoint: "/api.attendance/:id",
    },
    getAttendees: {
      method: "GET",
      endpoint: "/api.attendance/:id/attendees",
    },
  },
  // teacher
  teacher: {
    create: {
      method: "POST",
      endpoint: "/api.user",
    },
    update: {
      method: "PATCH",
      endpoint: "/api.user/:id",
    },
    _delete: {
      method: "DELETE",
      endpoint: "/api.user/:id",
    },
    getAll: {
      method: "GET",
      endpoint: "/api.user",
    },
    getSingle: {
      method: "GET",
      endpoint: "/api.user/:id",
    },
    getPublicTeachers: {
      method: "GET",
      endpoint: "/api.user/public/teachers",
    },
  },
  difficulty: {
    create: {
      method: "POST",
      endpoint: "/api.difficulty",
    },
    _delete: {
      method: "DELETE",
      endpoint: "/api.difficulty/:id",
    },
    getAll: {
      method: "GET",
      endpoint: "/api.difficulty",
    },
  },
  chapter: {
    create: {
      method: "POST",
      endpoint: "/api.chapter",
    },
    _delete: {
      method: "DELETE",
      endpoint: "/api.chapter/:id",
    },
    getAll: {
      method: "GET",
      endpoint: "/api.chapter",
    },
  },
  question: {
    create: {
      method: "POST",
      endpoint: "/api.question",
    },
    update: {
      method: "PUT",
      endpoint: "/api.question/:id",
    },
    _delete: {
      method: "DELETE",
      endpoint: "/api.question/:id",
    },
    getAll: {
      method: "GET",
      endpoint: "/api.question",
    },
    getSingle: {
      method: "GET",
      endpoint: "/api.question/:id",
    },
  },
  language: {
    getAll: {
      method: "GET",
      endpoint: "/api.language",
    },
  },
  googleAI: {
    generateCode: {
      method: "POST",
      endpoint: "/api.googleai",
    },
  },
  //letter
  letter: {
    create: {
      method: "POST",
      endpoint: "/api.letter",
    },
    update: {
      method: "PATCH",
      endpoint: "/api.letter/:id",
    },
    getAll: {
      method: "GET",
      endpoint: "/api.letter",
    },
    getSingle: {
      method: "GET",
      endpoint: "/api.letter/:id",
    },
  },
  //metadata
  metadata: {
    update: {
      method: "PATCH",
      endpoint: "/api.meta/setting",
    },
    getSingle: {
      method: "GET",
      endpoint: "/api.meta/setting",
    },
  },
};
