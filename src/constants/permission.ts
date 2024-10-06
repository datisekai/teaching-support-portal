export const permissions = [
  {
    title: "Người dùng",
    children: [
      {
        title: "Xem danh sách",
        value: "view-user",
      },
      {
        title: "Tạo mới",
        value: "create-user",
      },
      {
        title: "Cập nhật",
        value: "edit-user",
      },
      {
        title: "Xoá",
        value: "delete-user",
      },
      {
        title: "Khóa",
        value: "block-user",
      },
      {
        title: "Reset thiết bị",
        value: "reset-device-id-user",
      },
      {
        title: "Import",
        value: "import-user",
      },
      {
        title: "Export",
        value: "export-user",
      },
      {
        title: "Gán nhóm quyền",
        value: "assign-group-permission-user",
      },
    ],
  },
  {
    title: "Ngành học",
    children: [
      {
        title: "Xem danh sách",
        value: "view-faculty",
      },
      {
        title: "Tạo mới",
        value: "create-faculty",
      },
      {
        title: "Cập nhật",
        value: "edit-faculty",
      },
      {
        title: "Xoá",
        value: "delete-faculty",
      },
      {
        title: "Import",
        value: "import-faculty",
      },
      {
        title: "Export",
        value: "export-faculty",
      },
    ],
  },
  {
    title: "Môn học",
    children: [
      {
        title: "Xem danh sách",
        value: "view-subject",
      },
      {
        title: "Tạo mới",
        value: "create-subject",
      },
      {
        title: "Cập nhật",
        value: "edit-subject",
      },
      {
        title: "Xoá",
        value: "delete-subject",
      },
      {
        title: "Thêm giảng viên",
        value: "add-teacher-subject",
      },
      {
        title: "Import",
        value: "import-subject",
      },
      {
        title: "Export",
        value: "export-subject",
      },
    ],
  },
  {
    title: "Lớp học",
    children: [
      {
        title: "Xem danh sách",
        value: "view-class",
      },
      {
        title: "Tạo mới",
        value: "create-class",
      },
      {
        title: "Cập nhật",
        value: "edit-class",
      },
      {
        title: "Xoá",
        value: "delete-class",
      },
      {
        title: "Thống kê",
        value: "statistic-class",
      },
      {
        title: "Xem danh sách sinh viên",
        value: "view-student-class",
      },
      {
        title: "Import",
        value: "import-class",
      },
      {
        title: "Export",
        value: "export-class",
      },
    ],
  },
  {
    title: "Đơn từ",
    children: [
      {
        title: "Xem danh sách",
        value: "view-letter",
      },
      {
        title: "Xem",
        value: "view-detail-letter",
      },
    ],
  },
  {
    title: "Thông báo",
    children: [
      {
        title: "Xem danh sách",
        value: "view-notification",
      },
      {
        title: "Tạo mới",
        value: "create-notification",
      },
      {
        title: "Cập nhật",
        value: "edit-notification",
      },
      {
        title: "Xoá",
        value: "delete-notification",
      },
    ],
  },
  {
    title: "Điểm danh",
    children: [
      {
        title: "Xem danh sách",
        value: "view-attendance",
      },
      {
        title: "Tạo mới",
        value: "create-attendance",
      },
      {
        title: "Cập nhật",
        value: "edit-attendance",
      },
      {
        title: "Xoá",
        value: "delete-attendance",
      },
      {
        title: "Danh sách điểm danh",
        value: "view-detail-student-attendance",
      },
      {
        title: "Logs",
        value: "logs-attendance",
      },
      {
        title: "Chi tiết",
        value: "detail-attendance",
      },
    ],
  },
  {
    title: "Sinh viên của lớp",
    children: [
      {
        title: "Xem danh sách",
        value: "view-user-class",
      },
      {
        title: "Tạo mới",
        value: "create-user-class",
      },
      {
        title: "Cập nhật",
        value: "edit-user-class",
      },
      {
        title: "Xoá",
        value: "delete-user-class",
      },
      {
        title: "Reset thiết bị",
        value: "reset-device-id-user-class",
      },
      {
        title: "Import",
        value: "import-user-class",
      },
      {
        title: "Export",
        value: "export-user-class",
      },
    ],
  },
  {
    title: "Phân quyền",
    children: [
      {
        title: "Xem danh sách",
        value: "view-permission",
      },
      {
        title: "Tạo mới",
        value: "create-permission",
      },
      {
        title: "Cập nhật",
        value: "edit-permission",
      },
      {
        title: "Xoá",
        value: "delete-permission",
      },
      {
        title: "Gán quyền",
        value: "assign-permission",
      },
    ],
  },
  {
    title: "Giao diện",
    children: [
      {
        title: "Cập nhật",
        value: "edit-interface",
      },
    ],
  },
  {
    title: "Câu hỏi",
    children: [
      {
        title: "Xem danh sách",
        value: "view-question",
      },
      {
        title: "Tạo mới",
        value: "create-question",
      },
      {
        title: "Cập nhật",
        value: "edit-question",
      },
      {
        title: "Xoá",
        value: "delete-question",
      },
      {
        title: "Xem danh sách câu hỏi của tôi",
        value: "view-my-question",
      },
    ],
  },
  {
    title: "Đề thi",
    children: [
      {
        title: "Xem danh sách",
        value: "view-exam",
      },
      {
        title: "Xem danh sách điểm",
        value: "view-exam-score",
      },
      {
        title: "Export",
        value: "export-exam-score",
      },
      // {
      //   title: "Tạo mới",
      //   value: "create-exam",
      // },
      // {
      //   title: "Cập nhật",
      //   value: "edit-exam",
      // },
      // {
      //   title: "Xoá",
      //   value: "delete-exam",
      // },
    ],
  },
];

export const assignPermissions = [
  {
    role: "ADMIN",
    permissions: [
      "view-class",
      "view-faculty",
      "view-subject",
      "view-attendance",
      "view-user",
      "view-notification",
      "view-letter",
      "view-permission",
      "view-interface",
      "view-user-class",
      "view-permission",
      "view-interface",
      "view-permission",
      "view-question",
      "view-exam",
    ],
  },
  {
    role: "GIANGVIEN",
    permissions: ["view-user"],
  },
];
