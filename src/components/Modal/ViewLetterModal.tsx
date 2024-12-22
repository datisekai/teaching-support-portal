import React, { useState } from "react";
import { useModalStore } from "../../stores";
import dayjs from "dayjs";
import { Image } from "primereact/image";
import { getImageServer, getStatus, getTypeLetter } from "../../utils";
import CanActivate from "../CanActivate";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";

const ViewLetterModal: React.FC = () => {
  const { content } = useModalStore();
  const { data, handleSubmit } = content;
  const [text, setText] = useState('')

  console.log('data', data);

  return (
    <div>
      <div className="tw-flex tw-items-center tw-justify-between tw-gap-2">
        <div className="tw-flex-1">
          <p>
            <strong>Loại đơn từ: </strong>
            {getTypeLetter(data?.type)}
          </p>
          <p>
            <strong>Lý do: </strong>
            <div dangerouslySetInnerHTML={{ __html: data?.reason }}></div>
          </p>
          <p>
            <strong>Trạng thái: </strong>
            {getStatus(data?.status)}
          </p>
          <p>
            <strong>MSSV: </strong>
            {data?.studentCode}
          </p>
          <p>
            <strong>Tên sinh viên: </strong>
            {data?.studentName}
          </p>
          <p>
            <strong>Lớp: </strong>
            {data?.class.name}
          </p>
        </div>
        <div className="tw-flex-1">
          {data?.studentName && (
            <p>
              <Image
                preview
                src={getImageServer(data?.image)}
                alt="Minh chứng"
                width="100%"
              />
            </p>
          )}
        </div>

      </div>
      <div className="tw-mt-4 tw-space-y-4">
        {data?.status == 'pending' ? <div>
          <div>Ghi chú</div>
          <InputText value={text} onChange={(e) => setText(e.target.value)} className="w-full">{data?.content}</InputText>
        </div> : <p>{data?.note || ""}</p>}

        <CanActivate permission="letter:update">
          {data?.status == "pending" && (
            <div className="tw-flex tw-justify-end tw-items-center">
              <Button
                label="Từ chối"
                icon="pi pi-times"
                type="button"
                severity="danger"
                onClick={() => handleSubmit(data.id, { status: "rejected", note: text })}
              />
              <Button
                label="Đồng ý"
                icon="pi pi-check"
                className="tw-ml-2"
                autoFocus
                onClick={() => handleSubmit(data.id, { status: "approved", note: text })}
              />
            </div>
          )}
        </CanActivate>
      </div>
    </div>
  );
};

export default ViewLetterModal;
