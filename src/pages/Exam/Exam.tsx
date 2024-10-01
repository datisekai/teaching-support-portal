import { useEffect, useState } from "react";
import { useCommonStore, useModalStore } from "../../stores";
import MyTable, { IActionTable } from "../../components/UI/MyTable";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { ModalName } from "../../components/constants";
import { exams, examSchemas } from "../../dataTable/exam";
import useConfirm from "../../hooks/useConfirm";

interface IStatus {
  id: string;
  label: string;
}

const Exam = () => {
  const navigate = useNavigate();
  const { onToggle, onDismiss } = useModalStore();
  const { onConfirm } = useConfirm();
  const { setHeaderTitle, setHeaderActions, resetActions } = useCommonStore();

  const handleSubmit = (data: any) => {
    onDismiss();
  };

  const handleEdit = (data: any) => {
    navigate(`/exam/edit/${data.id}`);
  };

  const handleDelete = (id: number) => {
    const data = {
      message: "Bạn có chắc chắn muốn xoá câu hỏi này?",
      header: "Xác nhận xoá",
      onAccept: () => {
        console.log("Đã xoá câu hỏi thành công!", id);
      },
      onReject: () => {
        console.log("Đã hủy bỏ hành động.");
      },
    };
    onConfirm(data);
  };

  const handleView = (data: any) => {
    onToggle(ModalName.VIEW_EXAM, {
      header: "Chi tiết câu hỏi",
      footer: (
        <>
          {data.status == "pending" && (
            <div className="tw-flex tw-justify-end tw-items-center">
              <Button
                label="Ok"
                icon="pi pi-check"
                autoFocus
                onClick={() => handleSubmit(data)}
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
    {
      onClick: (data, options) => {
        handleEdit(data);
      },
      tooltip: "Sửa",
      icon: "pi-pencil",
      severity: "warning",
    },
    {
      onClick: (data, options) => {
        handleDelete(data);
      },
      tooltip: "Xóa",
      icon: "pi-trash",
      severity: "danger",
    },
  ];

  useEffect(() => {
    setHeaderTitle("Quản lý Đơn từ");
    setHeaderActions([
      {
        title: "Tạo",
        icon: "pi pi-plus",
        onClick: () => {
          navigate(`/exam/create`);
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
      <MyTable data={exams} schemas={examSchemas} actions={actionTable} />
    </div>
  );
};

export default Exam;
