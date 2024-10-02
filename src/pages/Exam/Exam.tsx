import { useEffect, useState } from "react";
import { useCommonStore, useModalStore } from "../../stores";
import MyTable, { IActionTable } from "../../components/UI/MyTable";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { exams, examSchemas } from "../../dataTable/exam";
import useConfirm from "../../hooks/useConfirm";
import { ModalName } from "../../constants";

const Exam = () => {
  const navigate = useNavigate();
  const { onToggle, onDismiss } = useModalStore();
  const { onConfirm } = useConfirm();
  const { setHeaderTitle, setHeaderActions, resetActions } = useCommonStore();

  const handleSubmit = (data: any) => {
    onDismiss();
  };

  const handleView = (data: any) => {
    navigate(`/exam/view/${data.id}`);
  };
  const handleEdit = (data: any) => {
    console.log(data);
    navigate(`/exam/edit/${data.id}`);
  };

  const handleDelete = (id: number) => {
    const data = {
      message: "Bạn có chắc chắn muốn xoá đề thi này?",
      header: "Xác nhận xoá",
      onAccept: () => {
        console.log("Đã xoá đề thi thành công!", id);
      },
      onReject: () => {
        console.log("Đã hủy bỏ hành động.");
      },
    };
    onConfirm(data);
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
      tooltip: "Sửa",
      icon: "pi-pencil",
      severity: "warning",
    },
    {
      onClick: (data, options) => {
        handleDelete(data.id);
      },
      tooltip: "Xóa",
      icon: "pi-trash",
      severity: "danger",
    },
  ];

  useEffect(() => {
    setHeaderTitle("Quản lý Đề thi");
    setHeaderActions([
      {
        title: "Tạo mới",
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
