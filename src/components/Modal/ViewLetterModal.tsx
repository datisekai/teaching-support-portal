import React from "react";
import { useModalStore } from "../../stores";
import dayjs from "dayjs";
import { Image } from "primereact/image";
import { getImageServer, getStatus, getTypeLetter } from "../../utils";

const ViewLetterModal: React.FC = () => {
  const { content } = useModalStore();

  return (
    <div className="tw-flex tw-items-center tw-justify-between tw-gap-2">
      <div className="tw-flex-1">
        <p>
          <strong>Loại đơn từ: </strong>
          {getTypeLetter(content.type)}
        </p>
        <p>
          <strong>Lý do: </strong>
          <div dangerouslySetInnerHTML={{ __html: content.reason }}></div>
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
      <div className="tw-flex-1">
        {content.studentName && (
          <p>
            <Image
              preview
              src={getImageServer(content.image)}
              alt="Minh chứng"
              width="100%"
            />
          </p>
        )}
      </div>
    </div>
  );
};

export default ViewLetterModal;
