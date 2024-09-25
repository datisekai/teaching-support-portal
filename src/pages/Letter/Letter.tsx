import { useEffect, useState } from "react";
import { useCommonStore, useModalStore } from "../../stores";
import MyTable, { IActionTable } from "../../components/UI/MyTable";
import { useNavigate } from "react-router-dom";
import { letters, letterSchemas } from "../../dataTable/letter";
import { Button } from "primereact/button";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { ModalName } from "../../components/constants";

interface IStatus {
  id: string;
  label: string;
}

const Letter = () => {
  const navigate = useNavigate();
  const { onToggle } = useModalStore();
  const { setHeaderTitle, setHeaderActions, resetActions } = useCommonStore();
  const [selectedStatus, setSelectedStatus] = useState<IStatus | null>(null);

  const handleSubmit = (data: any) => {
    console.log("Dữ liệu:", data);
    console.log("Trạng thái đã chọn:", selectedStatus);
  };
  console.log("Trạng thái được chọn:", selectedStatus);
  const handleView = (data: any) => {
    onToggle(
      ModalName.VIEW_LETTER,
      {
        header: "Chi tiết đơn",
        footer: (
          <>
            {data.status == 'pending' && <div className="tw-flex tw-justify-end tw-items-center">

              <Button
                label="Từ chối"
                icon="pi pi-times"
                type="button"
                severity="danger"
                onClick={() => handleSubmit(data)}
              />
              <Button
                label="Đồng ý"
                icon="pi pi-check"
                autoFocus
                onClick={() => handleSubmit(data)}
              />
            </div>}
          </>
        ),
        content: data, // Nội dung chi tiết của đơn từ
        style: "tw-w-[90%] md:tw-w-[30rem]"
      },

    );
  };

  const actionTable: IActionTable[] = [
    {
      onClick: (data, options) => {
        handleView(data);
      },
      tooltip: "Xem",
      icon: "pi-eye",
      severity: "info",
    },
  ];

  useEffect(() => {
    setHeaderTitle("Quản lý Đơn từ");

    return () => {
      resetActions();
    };
  }, []);

  return (
    <div>
      <MyTable data={letters} schemas={letterSchemas} actions={actionTable} />
    </div>
  );
};

export default Letter;
