import React from "react";
import MyTableCustom from "../../components/UI/MyTableCustom";
import {
  scoreColumnManagements,
  scoreColumnManagementSchemas,
} from "../../dataTable/score-column-management";
import { classes, classSchemas } from "../../dataTable/class";
import { IActionTable } from "../../components/UI/MyTable";
import useConfirm from "../../hooks/useConfirm";

const ScoreColumnManagement = () => {
  const actionTable: IActionTable[] = [
    {
      onClick: (data, options) => {
        handleDelete(data.id);
      },
      tooltip: "Xóa",
      icon: "pi-trash",
      severity: "danger",
    },
  ];
  const { onConfirm } = useConfirm();

  const handleDelete = (id: number) => {
    const data = {
      message: "Bạn có chắc chắn muốn xoá lớp học này?",
      header: "Xác nhận xoá",
      onAccept: () => {
        console.log("Đã xoá thành công!", id);
      },
      onReject: () => {
        console.log("Đã hủy bỏ hành động.");
      },
    };
    onConfirm(data);
  };
  return (
    <div>
      <MyTableCustom
        data={scoreColumnManagements}
        schemas={scoreColumnManagementSchemas}
        actions={actionTable}
        isFooter={true}
      />
    </div>
  );
};

export default ScoreColumnManagement;
