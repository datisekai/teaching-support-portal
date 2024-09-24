import { useEffect, useState } from "react";
import { useCommonStore, useModalStore } from "../../stores";
import MyTable, { IActionTable } from "../../components/UI/MyTable";
import { useNavigate } from "react-router-dom";
import { letters, letterSchemas } from "../../dataTable/letter";
import { Button } from "primereact/button";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";

interface IStatus {
  id: string;
  label: string;
}

const Letter = () => {
  const navigate = useNavigate();
  const { onToggle } = useModalStore();
  const { setHeaderTitle, setHeaderActions, resetActions } = useCommonStore();
  const [selectedStatus, setSelectedStatus] = useState<IStatus | null>(null);

  const statusConfirms: IStatus[] = [
    { id: "1", label: "Đồng ý" },
    { id: "2", label: "Từ chối" },
  ];

  const handleSubmit = (data: any) => {
    console.log("Dữ liệu:", data);
    console.log("Trạng thái đã chọn:", selectedStatus);
  };
  console.log("Trạng thái được chọn:", selectedStatus);
  const handleView = (data: any) => {
    onToggle(
      "viewletter",
      {
        header: "Chi tiết đơn",
        footer: (
          <div className="tw-flex tw-justify-between tw-items-center">
            <div>
              <Dropdown
                value={selectedStatus}
                onChange={(e: DropdownChangeEvent) => {
                  setSelectedStatus(e.value);
                }}
                options={statusConfirms}
                optionLabel="label"
                placeholder={`Chọn trạng thái`}
                className="tw-w-full"
              />
            </div>
            <Button
              label="Ok"
              icon="pi pi-check"
              autoFocus
              onClick={() => handleSubmit(data)}
            />
          </div>
        ),
        content: data, // Nội dung chi tiết của đơn từ
      },
      "tw-w-[90%] md:tw-w-[80rem]"
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
    setHeaderActions([
      {
        title: "Tạo",
        icon: "pi pi-plus",
        onClick: () => {
          navigate(`/letter/create`);
        },
        type: "button",
        disabled: false,
      },
    ]);

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
