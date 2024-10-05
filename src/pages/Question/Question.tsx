import { useEffect, useState } from "react";
import { useCommonStore, useModalStore } from "../../stores";
import MyTable, { IActionTable } from "../../components/UI/MyTable";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { questions, questionSchemas } from "../../dataTable/question";
import useConfirm from "../../hooks/useConfirm";
import { ModalName } from "../../constants";

interface IStatus {
  id: string;
  label: string;
}

const Question = () => {
  const navigate = useNavigate();
  const { onToggle, onDismiss } = useModalStore();
  const { onConfirm } = useConfirm();
  const { setHeaderTitle, setHeaderActions, resetActions } = useCommonStore();

  const handleSubmit = (data: any) => {
    onDismiss();
  };

  const handleEdit = (data: any) => {
    navigate(`/question/edit/${data.id}`);
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
    console.log(data);
    onToggle(ModalName.VIEW_QUESTION, {
      header: "Chi tiết câu hỏi",
      content: data, // Nội dung chi tiết của câu hỏi
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
    setHeaderTitle("Quản lý câu hỏi");
    setHeaderActions([
      {
        title: "Tạo",
        icon: "pi pi-plus",
        onClick: () => {
          navigate(`/question/create`);
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
      <MyTable
        data={questions}
        schemas={questionSchemas}
        actions={actionTable}
      />
    </div>
  );
};

export default Question;
