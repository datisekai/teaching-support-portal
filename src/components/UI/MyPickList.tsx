import { Button } from "primereact/button";
import { PickList, PickListChangeEvent } from "primereact/picklist";
import React, { ReactNode, useState } from "react";
import { useModalStore } from "../../stores";
import { ModalName } from "../../constants";

export interface ISource {
  id: number;
  content: string;
  subcontent?: ReactNode;
  detail?: any;
}
interface IMyPickList {
  source: ISource[];
  target: ISource[];
  onChange: (event: PickListChangeEvent) => void;
  handleOpenModal?: (data: any) => void;
}

const MyPickList: React.FC<IMyPickList> = ({
  source,
  target,
  onChange,
  handleOpenModal,
}) => {
  const itemTemplate = (item: any) => {
    return (
      <div className="tw-flex tw-items-center tw-justify-between">
        <div>
          <div className="tw-font-bold tw-truncate tw-w-[420px]">
            {item.content}
          </div>
          <div className="tw-text-xs tw-truncate tw-w-[420px]">
            {item.subcontent}
          </div>
        </div>
        {item.detail && handleOpenModal && (
          <div>
            <i
              onClick={() => handleOpenModal(item.detail)}
              className="pi pi-ellipsis-v"
            ></i>
          </div>
        )}
      </div>
    );
  };
  return (
    <div>
      <PickList
        dataKey="id"
        source={source}
        target={target}
        onChange={onChange}
        itemTemplate={itemTemplate}
        onBlur={() => {}}
        filter
        filterBy="content"
        // breakpoint="1280px"
        sourceHeader={`Chưa chọn (${source.length})`}
        targetHeader={`Đã chọn (${target.length})`}
        sourceStyle={{ height: "24rem" }}
        targetStyle={{ height: "24rem" }}
        sourceFilterPlaceholder="Tìm kiếm nội dung"
        targetFilterPlaceholder="Tìm kiếm nội dung"
      />
    </div>
  );
};

export default MyPickList;
