import React from "react";
import { useModalStore } from "../../stores";
import dayjs from "dayjs";
import { Image } from "primereact/image";
import { getImageServer, getStatus, getTypeLetter } from "../../utils";

const ViewLetterModal: React.FC = () => {
  const { content } = useModalStore();

  return (
    <div className="tw-flex tw-items-center tw-justify-between">
      <div>
        <p>
          <strong>Loại đơn từ: </strong>
          {getTypeLetter(content.type)}
        </p>
        <p>
          <strong>Lý do: </strong>
          {content.reason}
        </p>
        <p>
          <strong>Trạng thái: </strong>
          {getStatus(content.status)}
        </p>
        <p>
          <strong>MSSV: </strong>
          {content.studentCode}
        </p>
        <p>
          <strong>Tên sinh viên: </strong>
          {content.studentName}
        </p>
        <p>
          <strong>Lớp: </strong>
          {content.class.name}
        </p>
      </div>
      <div>
        {content.studentName && (
          <p>
            <Image
              preview
              src={getImageServer(content.image)}
              alt="Minh chứng"
              width="180"
              height="180"
            />
          </p>
        )}
      </div>
    </div>
  );
};

export default ViewLetterModal;
