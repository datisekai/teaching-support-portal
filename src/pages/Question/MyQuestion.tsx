import { useEffect, useState } from "react";
import { useCommonStore, useModalStore } from "../../stores";
import MyTable, { IActionTable } from "../../components/UI/MyTable";
import { useNavigate } from "react-router-dom";
import useConfirm from "../../hooks/useConfirm";
import { myQuestions, myQuestionSchemas } from "../../dataTable/my-question";

interface IStatus {
  id: string;
  label: string;
}

const MyQuestion = () => {
  const navigate = useNavigate();
  const { onConfirm } = useConfirm();
  const { setHeaderTitle, setHeaderActions, resetActions } = useCommonStore();

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

  const handleShare = (data: any) => {
    console.log(data);
  };

  const actionTable: IActionTable[] = [
    {
      onClick: (data, options) => {
        handleShare(data);
      },
      tooltip: "Share",
      icon: "pi-share-alt",
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
    setHeaderTitle("Quản lý câu hỏi của tôi");
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
        data={myQuestions}
        schemas={myQuestionSchemas}
        actions={actionTable}
      />
    </div>
  );
};

export default MyQuestion;
