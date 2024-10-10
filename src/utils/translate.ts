export const translateResource = (resource: string): string => {
  switch (resource) {
    case "user":
      return "Người dùng";
    case "upload":
      return "Tải lên";
    case "permission":
      return "Quyền";
    case "role":
      return "Vai trò";
    case "faculty":
      return "Khoa";
    case "major":
      return "Chuyên ngành";
    case "class":
      return "Lớp học";
    case "letter":
      return "Đơn từ";
    case "notification":
      return "Thông báo";
    case "attendance":
      return "Điểm danh";
    case "theme":
      return "Chủ đề";
    case "question":
      return "Câu hỏi";
    case "answer":
      return "Câu trả lời";
    case "exam":
      return "Kỳ thi";
    default:
      return "Không rõ";
  }
};
export const translateAction = (action: string): string => {
  switch (action) {
    case "view":
      return "Xem";
    case "create":
      return "Tạo";
    case "update":
      return "Cập nhật";
    case "update_own":
      return "Cập nhật của mình";
    case "delete":
      return "Xóa";
    case "image":
      return "Hình ảnh";
    case "video":
      return "Video";
    case "assign_permission":
      return "Gán quyền";
    case "statistic":
      return "Thống kê";
    case "view_student":
      return "Xem học sinh";
    case "create_student":
      return "Tạo học sinh";
    case "update_student":
      return "Cập nhật học sinh";
    case "delete_student":
      return "Xóa học sinh";
    default:
      return "Không rõ";
  }
};
