import { PickList, PickListChangeEvent } from "primereact/picklist";
import React, { ReactNode, useState } from "react";

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
}

const MyPickList: React.FC<IMyPickList> = ({ source, target, onChange }) => {
  const itemTemplate = (item: any) => {
    return (
      <div className="">
        <div className="tw-font-bold">{item.content}</div>
        <div className="tw-text-xs">{item.subcontent}</div>
        {/* {itemDetail(item)} */}
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
        filter
        filterBy="content"
        // breakpoint="1280px"
        sourceHeader="Đang có"
        targetHeader="Chọn"
        sourceStyle={{ height: "24rem" }}
        targetStyle={{ height: "24rem" }}
        sourceFilterPlaceholder="Tìm kiếm nội dung"
        targetFilterPlaceholder="Tìm kiếm nội dung"
      />
    </div>
  );
};

export default MyPickList;
