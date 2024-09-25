import React from "react";
import { useModalStore } from "../../stores";
import dayjs from "dayjs";

const ViewLetterModal: React.FC = () => {
  const { content } = useModalStore();

  return (
    <div>
      <p>
        <strong>Loại đơn từ:</strong> {content.type}
      </p>
      <p>
        <strong>Lý do:</strong> {content.reason}
      </p>
      <p>
        <strong>Minh chứng: <a href="/" className="tw-text-blue-500 hover:tw-underline tw-font-normal tw-cursor-pointer">Xem tại đây</a></strong>
      </p>
      <p>
        <strong>MSSV:</strong> {content.studentCode}
      </p>
      <p>
        <strong>Tên sinh viên:</strong> {content.studentName}
      </p>
      <p>
        <strong>Ngày xin nghỉ:</strong>{" "}
        {dayjs(content.absenceDate).format("DD/MM/YYYY HH:mm")}
      </p>
      <p>
        <strong>Ngày tạo:</strong>{" "}
        {dayjs(content.createdAt).format("DD/MM/YYYY HH:mm")}
      </p>
    </div>
  );
};

export default ViewLetterModal;
