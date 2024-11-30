import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import React from "react";
import { useModalStore } from "../../stores";
import { ModalName } from "../../constants";
import { apiConfig } from "../../apis";

type Props = {
  value?: any;
  onChange: (value: any) => void;
  apiUrl?: string;
  query?: any;
  placeholder?: string;
  titleModal?: string
};
const MySmartSelect: React.FC<Props> = ({
  value,
  onChange,
  apiUrl = apiConfig.user.search.endpoint,
  query,
  placeholder = "Chọn người dùng",
  titleModal = "Chọn giảng viên"
}) => {
  const { onToggle } = useModalStore();
  return (
    <div className="tw-flex tw-gap-2">
      <InputText disabled={true} value={value?.name || placeholder} />
      <Button
        label="Chọn"
        onClick={() =>
          onToggle(ModalName.SMART_SEARCH, {
            header: titleModal,
            content: {
              apiUrl,
              onApply: (value: any) => onChange(value),
              query,
            },
          })
        }
        icon={"pi pi-wrench"}
      />
    </div>
  );
};

export default MySmartSelect;
