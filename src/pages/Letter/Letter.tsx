import { useEffect, useState } from "react";
import { useCommonStore, useModalStore } from "../../stores";
import MyTable, { IActionTable } from "../../components/UI/MyTable";
import { useNavigate } from "react-router-dom";
import { letters, letterSchemas } from "../../dataTable/letterTable";
import { Button } from "primereact/button";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { ModalName } from "../../constants";
import { useLetterStore } from "../../stores/letterStore";
import { useToast } from "../../hooks/useToast";

interface IStatus {
  id: string;
  label: string;
}

const Letter = () => {
  const navigate = useNavigate();
  const { onToggle } = useModalStore();
  const { setHeaderTitle, setHeaderActions, resetActions } = useCommonStore();

  const { fetchLetters, letters, total, updateStatus } = useLetterStore();
  const { isLoadingApi } = useCommonStore();
  const { showToast } = useToast();
  const { onDismiss } = useModalStore();
  const handleSubmit = async (id: number, data: any) => {
    const result = await updateStatus(id, { status: data });
    onDismiss();
    if (!result) {
      return showToast({
        severity: "danger",
        summary: "Thông báo",
        message: "Sửa thất bại",
        life: 3000,
      });
    }
    showToast({
      severity: "success",
      summary: "Thông báo",
      message: "Sửa thành công",
      life: 3000,
    });
  };
  const handleView = (data: any) => {
    onToggle(ModalName.VIEW_LETTER, {
      header: "Chi tiết đơn",
      footer: (
        <>
          {data.status == "pending" && (
            <div className="tw-flex tw-justify-end tw-items-center">
              <Button
                label="Từ chối"
                icon="pi pi-times"
                type="button"
                severity="danger"
                onClick={() => handleSubmit(data.id, "rejected")}
              />
              <Button
                label="Đồng ý"
                icon="pi pi-check"
                autoFocus
                onClick={() => handleSubmit(data.id, "approved")}
              />
            </div>
          )}
        </>
      ),
      content: data, // Nội dung chi tiết của đơn từ
      style: "tw-w-[90%] md:tw-w-[30rem]",
    });
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
  }, [resetActions, setHeaderTitle]);

  const handleSearch = (query: Object) => {
    fetchLetters(query);
  };
  return (
    <div>
      <MyTable
        keySearch="studentName"
        data={letters.map((item) => ({
          ...item,
          studentName: item.user.name,
          studentCode: item.user.code,
        }))}
        schemas={letterSchemas}
        actions={actionTable}
        onChange={handleSearch}
        totalRecords={total}
        isLoading={isLoadingApi}
      />
    </div>
  );
};

export default Letter;
