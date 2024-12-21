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
  updateProfile: {
    method: "PUT",
    endpoint: "/api.user/me",
  },
  updateUser: {
    method: "PUT",
    endpoint: "/api.user/:id",
  },
  statistic: {
    method: "GET",
    endpoint: "/api.user/statistic",
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
    importFaculty: {
      method: "POST",
      endpoint: "/api.faculty/multiple",
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
    importMajor: {
      method: "POST",
      endpoint: "/api.major/multiple",
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
    getStudentClass: {
      method: "GET",
      endpoint: "/api.class/:id/student",
    },
    importUser: {
      method: "POST",
      endpoint: "/api.class/:id/import-users",
    },
    createStudentClass: {
      method: "POST",
      endpoint: "/api.class/student/:id",
    },
    deleteStudentClass: {
      method: "DELETE",
      endpoint: "/api.class/:classId/student/:studentCode",
    },
    importClass: {
      method: "POST",
      endpoint: "/api.class/multiple",
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
    resetDevice: {
      method: "PUT",
      endpoint: "/api.user/:id/reset-device",
    },
    search: {
      method: "GET",
      endpoint: "/api.user/search",
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
  //Location
  location: {
    create: {
      method: "POST",
      endpoint: "/api.location",
    },
    update: {
      method: "PUT",
      endpoint: "/api.location/:id",
    },
    _delete: {
      method: "DELETE",
      endpoint: "/api.location/:id",
    },
    getAll: {
      method: "GET",
      endpoint: "/api.location",
    },
    getSingle: {
      method: "GET",
      endpoint: "/api.location/:id",
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
    getAttendanceStatistic: {
      method: "GET",
      endpoint: "/api.attendance/class/:id/statistic",
    },
    toggleAttendee: {
      method: "POST",
      endpoint: "/api.attendance/:id/attendees/:userId",
    },
    link: {
      method: "POST",
      endpoint: "/api.attendance/link/:id",
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
    generate: {
      method: "GET",
      endpoint: "/api.question/generate",
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
    updateStatus: {
      method: "PATCH",
      endpoint: "/api.letter/:id/status",
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
  //score-column
  scoreColumn: {
    update: {
      method: "POST",
      endpoint: "/api.score-column",
    },
    createMultiple: {
      method: "POST",
      endpoint: "/api.score-column/multiple",
    },
    getSingle: {
      method: "GET",
      endpoint: "/api.score-column/:id",
    },
    getSingleClass: {
      method: "GET",
      endpoint: "/api.score-column/class/:id",
    },
    _delete: {
      method: "DELETE",
      endpoint: "/api.score-column/:id",
    },
  },
  //student-score
  studentScore: {
    update: {
      method: "POST",
      endpoint: "/api.student-score",
    },
    getSingle: {
      method: "GET",
      endpoint: "/api.student-score/class/:id",
    },
  },
  //exam
  exam: {
    getAll: {
      method: "GET",
      endpoint: "/api.exam",
    },
    getSingle: {
      method: "GET",
      endpoint: "/api.exam/:id",
    },
    update: {
      method: "PUT",
      endpoint: "/api.exam/:id",
    },
    create: {
      method: "POST",
      endpoint: "/api.exam",
    },
    _delete: {
      method: "DELETE",
      endpoint: "/api.exam/:id",
    },
    getHistory: {
      method: "GET",
      endpoint: "/api.submission/score/:id",
    },
    getExamHistory: {
      method: "GET",
      endpoint: "/api.submission/history/:id/user/:userId",
    },
    getTakeOrder: {
      method: "GET",
      endpoint: "/api.exam/take-order/:id",
    },
    updateSubmission: {
      method: "PUT",
      endpoint: "/api.submission/:submissionId",
    },
    link: {
      method: "POST",
      endpoint: "/api.exam/link/:id",
    },
  },
};
