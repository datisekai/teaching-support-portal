import React, { useEffect, useState } from "react";
import { useModalStore } from "../../stores";
import { PickList } from "primereact/picklist";
import { PickListChangeEvent } from "primereact/picklist";
import { teachers } from "../../dataTable/teacher";

const PickListModal: React.FC = () => {
  const { content } = useModalStore();

  const [source, setSource] = useState(content.contents);
  const [target, setTarget] = useState([]);

  const onChange = (event: PickListChangeEvent) => {
    setSource(event.source);
    setTarget(event.target);
  };

  const itemTemplate = (item: any) => {
    return (
      <div className="">
        <div className="tw-font-bold">{item.content}</div>
        <div className="tw-text-xs">{item.subcontent}</div>
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
        filterBy="name"
        breakpoint="1280px"
        sourceHeader="Available"
        targetHeader="Selected"
        sourceStyle={{ height: "24rem" }}
        targetStyle={{ height: "24rem" }}
        sourceFilterPlaceholder="Search by name"
        targetFilterPlaceholder="Search by name"
      />
    </div>
  );
};

export default PickListModal;
