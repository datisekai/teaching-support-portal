export const translateResource = (resource: string): string => {
  switch (resource) {
    case "user":
      return "Quản lý người dùng";
    case "upload":
      return "Tải lên";
    case "permission":
      return "Quản lý quyền";
    case "role":
      return "Loại người dùng";
    case "faculty":
      return "Khoa";
    case "major":
      return "Môn học";
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
      return "Bài thi";
    case "difficulty":
      return "Độ khó";
    case "meta":
      return "Meta";
    case "score_column":
      return "Cột điểm";
    case "student_score":
      return "Điểm sinh viên";
    case "chapter":
      return "Chương";
    case "location":
      return "Vị trí";
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
